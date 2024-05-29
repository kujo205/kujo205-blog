import { db } from "../../db";
import { ilike, or, and, inArray, gt, eq } from "drizzle-orm";
import { blogPosts, tagsToBlogPosts } from "../../db/schema";

class PostService {
  public async getSortedPosts(
    tagIds: number[],
    search: string,
    pageSize: number,
    cursor: number,
  ) {
    const posts = await db.query.blogPosts.findMany({
      limit: pageSize,
      where: and(
        cursor ? gt(blogPosts.id, cursor) : undefined,
        or(
          ilike(blogPosts.title, `%${search}%`),
          ilike(blogPosts.content, `%${search}%`),
          ilike(blogPosts.description, `%${search}%`),
        ),
      ),
      columns: {
        content: false,
      },
      with: {
        tagsToBlogPosts: {
          where:
            tagIds.length > 0
              ? inArray(tagsToBlogPosts.tagId, tagIds)
              : undefined,
          with: {
            blogPostTags: true,
          },
        },
      },
    });

    const mappedPosts = posts.map((post) => ({
      ...post,
      tagsToBlogPosts: undefined,
      tags: post.tagsToBlogPosts.map((tag) => tag.blogPostTags),
    }));

    return {
      posts: mappedPosts,
    };
  }

  public async getPostById(postId: number) {
    const post = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.id, postId),
      with: {
        tagsToBlogPosts: {
          with: {
            blogPostTags: true,
          },
        },
        // comments: true,
      },
    });

    return post;
  }
}

export default new PostService();

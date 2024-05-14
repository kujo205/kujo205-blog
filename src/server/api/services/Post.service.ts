import { db } from "../../db";
import { ilike, or } from "drizzle-orm";
import { blogPosts } from "../../db/schema";

class PostService {
  public async getSortedPosts(
    tagIds: number[],
    page: number,
    search: string,
    pageSize: number,
  ) {
    const posts = await db.query.blogPosts.findMany({
      where: or(
        ilike(blogPosts.title, `%${search}%`),
        ilike(blogPosts.content, `%${search}%`),
        ilike(blogPosts.description, `%${search}%`),
      ),
      columns: {
        content: false,
      },
      with: {
        tagsToBlogPosts: {
          with: {
            blogPostTags: true,
          },
        },
      },
    });

    const postInputTagsSize = tagIds.length;

    const postsSortedByTags = posts
      .filter((post) => {
        const tagIds = post.tagsToBlogPosts.map((tag) => tag.tagId);
        if (postInputTagsSize === 0) return true;

        return tagIds.some((tagId) => tagIds.includes(tagId));
      })
      .sort((postA, postB) => {
        const aTagIds = postA.tagsToBlogPosts.map((tag) => tag.tagId);
        const bTagIds = postB.tagsToBlogPosts.map((tag) => tag.tagId);

        return (
          this.countHowManyMatches(bTagIds, tagIds) -
          this.countHowManyMatches(aTagIds, tagIds)
        );

        return 1;
      });

    const postsSlicedByPage = postsSortedByTags.slice(
      page * pageSize,
      (page + 1) * pageSize,
    );

    const pagesLeft = Math.ceil(postsSortedByTags.length / pageSize) - page;

    return {
      posts: postsSlicedByPage,
      pagesLeft,
    };
  }

  private countHowManyMatches(a: number[], b: number[]) {
    return a.filter((v) => b.includes(v)).length;
  }
}

export default new PostService();

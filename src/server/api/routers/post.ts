import { z } from "zod";
import { env } from "@/env";
import { postSchema } from "@/schemas/post";
import {
  createTRPCRouter,
  protectedProcedure,
  adminProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
  blogPosts,
  blogPostTags,
  sessions,
  tagsToBlogPosts,
} from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq, ilike } from "drizzle-orm";

//TODO: add services here
export const postRouter = createTRPCRouter({
  getPosts: publicProcedure
    .input(
      z.object({
        search: z.string(),
        page: z.number(),
        pageSize: z.number(),
        tagIds: z.array(z.number()),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { db } = ctx;

      const posts = await db.query.blogPosts.findMany({
        where: ilike(blogPosts.title, `%${input.search}%`),
        with: {
          tagsToBlogPosts: {
            with: {
              blogPostTags: true,
            },
          },
        },
        limit: input.pageSize,
        offset: input.page * input.pageSize,
      });

      return {
        ...input,
        posts,
        left: 0,
      };
    }),
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getStandardUploadPreassignedUrl: protectedProcedure
    .input(z.object({ imageName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { imageName } = input;
      const { s3 } = ctx;

      const putObjectCommand = new PutObjectCommand({
        Bucket: env.BUCKET_NAME,
        Key: imageName,
      });
      const presignedUrl = await getSignedUrl(s3, putObjectCommand);
      const accessUrl = `https://${env.BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${imageName}`;

      return {
        presignedUrl,
        accessUrl,
      };
    }),
  addTag: adminProcedure
    .input(z.object({ tag: z.string() }))
    .mutation(async ({ ctx, input: { tag } }) => {
      if (tag.trim().length < 1)
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "Tag cannot be an empty string",
        });

      const { db } = ctx;

      const result = await db
        .insert(blogPostTags)
        .values({
          name: tag,
        })
        .returning({
          id: blogPostTags.id,
        });

      return result[0]?.id!;
    }),

  savePostValuesToSession: adminProcedure
    .input(z.object({ postFormValues: postSchema }))
    .mutation(async ({ ctx, input: { postFormValues } }) => {
      const { db, session } = ctx;

      try {
        const resp = await db
          .update(sessions)
          .set({
            postFormValues,
          })
          .where(eq(sessions.sessionToken, session.token));
      } catch (err) {
        console.log(err);
      }
    }),

  getPostValuesFromSession: adminProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;

    return db
      .select({ postFormValues: sessions.postFormValues })
      .from(sessions)
      .where(eq(sessions.sessionToken, session.token));
  }),

  getAllTags: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const data = await db.select().from(blogPostTags);

    return data.map(({ name, id }) => {
      return { label: name, value: id };
    });
  }),

  createPost: adminProcedure
    .input(z.object({ post: postSchema }))
    .mutation(async ({ ctx, input: { post } }) => {
      const { db, session } = ctx;

      console.log("creating a post", post);

      const resultFromDb = await db
        .insert(blogPosts)
        .values({
          content: post.content,
          title: post.title,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning({
          id: blogPosts.id,
        });

      if (!resultFromDb[0]) throw new Error("Failed to create post");
      const postId = resultFromDb[0].id;

      const insertStatements = post.tags.map((tagId) =>
        db
          .insert(tagsToBlogPosts)
          .values({
            blogPostId: postId,
            tagId,
          })
          .returning({
            id: tagsToBlogPosts.id,
          }),
      );

      const result = await Promise.all(insertStatements);
      console.log("inserted tag ids", result);

      return postId;
    }),

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //
  //     await ctx.db.insert(posts).values({
  //       name: input.name,
  //       createdById: ctx.session.user.id,
  //     });
  //   }),
  //
  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.query.posts.findFirst({
  //     // orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //   });
  // }),
  //
  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});

ALTER TABLE "kujo205_blog_tagsToBlogPosts" ADD CONSTRAINT "kujo205_blog_tagsToBlogPosts_blogPostId_tagId_pk" PRIMARY KEY("blogPostId","tagId");--> statement-breakpoint
ALTER TABLE "kujo205_blog_tagsToBlogPosts" DROP COLUMN IF EXISTS "id";

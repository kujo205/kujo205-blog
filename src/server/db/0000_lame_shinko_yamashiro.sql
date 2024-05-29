CREATE TABLE IF NOT EXISTS "kujo205_blog_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" varchar(255),
	"access_token" varchar(255),
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" varchar(2048),
	"session_state" varchar(255),
	CONSTRAINT "kujo205_blog_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kujo205_blog_postTag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kujo205_blog_blogPost" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"content" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"likes" integer DEFAULT 0,
	"watched" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kujo205_blog_comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"replyTo" varchar(255),
	"content" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kujo205_blog_message" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kujo205_blog_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	"postFormValues" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kujo205_blog_tagsToBlogPosts" (
	"id" serial PRIMARY KEY NOT NULL,
	"blogPostId" integer NOT NULL,
	"tagId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kujo205_blog_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp DEFAULT now(),
	"image" varchar(255),
	"role" varchar(20) DEFAULT 'COMMENTATOR'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kujo205_blog_verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "kujo205_blog_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "kujo205_blog_tagsToBlogPosts" ADD CONSTRAINT "kujo205_blog_tagsToBlogPosts_blogPostId_kujo205_blog_blogPost_id_fk" FOREIGN KEY ("blogPostId") REFERENCES "kujo205_blog_blogPost"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "kujo205_blog_tagsToBlogPosts" ADD CONSTRAINT "kujo205_blog_tagsToBlogPosts_tagId_kujo205_blog_postTag_id_fk" FOREIGN KEY ("tagId") REFERENCES "kujo205_blog_postTag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

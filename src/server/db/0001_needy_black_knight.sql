CREATE TABLE `kujo205-blog_tagsToBlogPosts` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`blogPostId` bigint NOT NULL,
	`tagId` bigint NOT NULL,
	CONSTRAINT `kujo205-blog_tagsToBlogPosts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `kujo205-blog_blogPostTag`;--> statement-breakpoint
ALTER TABLE `kujo205-blog_session` ADD `postFormValues` json;
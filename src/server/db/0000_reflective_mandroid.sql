CREATE TABLE `kujo205-blog_account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `kujo205-blog_account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `kujo205-blog_blogPost` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`title` varchar(256),
	`content` text,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`likes` int DEFAULT 0,
	`watched` int DEFAULT 0,
	CONSTRAINT `kujo205-blog_blogPost_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kujo205-blog_blogPostTag` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`blogPostId` bigint NOT NULL,
	`tagId` bigint NOT NULL,
	CONSTRAINT `kujo205-blog_blogPostTag_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kujo205-blog_comment` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`replyTo` bigint,
	`content` varchar(5000),
	CONSTRAINT `kujo205-blog_comment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kujo205-blog_message` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`message` text NOT NULL,
	CONSTRAINT `kujo205-blog_message_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kujo205-blog_postTag` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	CONSTRAINT `kujo205-blog_postTag_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kujo205-blog_session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `kujo205-blog_session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `kujo205-blog_user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	`image` varchar(255),
	`role` enum('ADMIN','COMMENTATOR') DEFAULT 'COMMENTATOR',
	CONSTRAINT `kujo205-blog_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kujo205-blog_verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `kujo205-blog_verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);

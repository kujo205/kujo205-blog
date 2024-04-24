import { relations } from "drizzle-orm";
import {
  integer,
  text,
  timestamp,
  varchar,
  jsonb,
  pgTableCreator,
  serial,
  primaryKey,
} from "drizzle-orm/pg-core";

export const pgTable = pgTableCreator((name) => `kujo205_blog_${name}`);

export const users = pgTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified").defaultNow(),
  image: varchar("image", { length: 255 }),
  role: varchar("role", { length: 20 }).default("COMMENTATOR"),
});

export const usersRelations = relations(users, ({ many }) => ({
  blogPosts: many(blogPosts),
  comments: many(comments),
  sessions: many(sessions),
  verificationTokens: many(verificationTokens),
}));

export const blogPosts = pgTable("blogPost", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().defaultNow(),
  likes: integer("likes").default(0),
  watched: integer("watched").default(0),
});

export const blogPostsRelations = relations(blogPosts, ({ many }) => ({
  user: many(users),
  comments: many(comments),
  tags: many(blogPostTags),
}));

export const blogPostTags = pgTable("postTag", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
});

export const blogPostTagsRelations = relations(blogPostTags, ({ many }) => ({
  blogPost: many(blogPosts),
}));

export const tagsToBlogPosts = pgTable("tagsToBlogPosts", {
  id: serial("id").primaryKey(),
  blogPostId: varchar("blogPostId", { length: 255 }).notNull(),
  tagId: varchar("tagId", { length: 255 }).notNull(),
});

export const tagsToBlogPostsRelations = relations(
  tagsToBlogPosts,
  ({ one }) => ({
    blogPost: one(blogPosts),
    tag: one(blogPostTags),
  }),
);

export const comments = pgTable("comment", {
  id: serial("id").primaryKey(),
  replyTo: varchar("replyTo", { length: 255 }),
  content: text("content"),
});

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users),
  replyTo: one(comments),
}));

export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users),
}));

export const sessions = pgTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires").notNull(),
  postFormValues: jsonb("postFormValues"),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const messages = pgTable("message", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  message: text("message").notNull(),
});

export type UserRole = typeof users.$inferSelect.role;

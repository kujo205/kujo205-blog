import { relations, sql } from "drizzle-orm";
import {
  bigint,
  int,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

export const mysqlTable = mysqlTableCreator((name) => `kujo205-blog_${name}`);

export const postTags = mysqlTable("postTag", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }),
});

export const blogPoTagsRelations = relations(postTags, ({ many }) => ({
  blogPost: many(blogPosts),
}));

export const blogPosts = mysqlTable("blogPost", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  title: varchar("title", { length: 256 }),
  content: text("content"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
  likes: int("likes").default(0),
  watched: int("watched").default(0),
});

export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  user: one(users),
  comments: many(comments),
  tags: many(postTags),
}));

export const blogPostsTags = mysqlTable("blogPostTag", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  blogPostId: bigint("blogPostId", { mode: "number" }).notNull(),
  tagId: bigint("tagId", { mode: "number" }).notNull(),
});

export const blogPostsTagsRelations = relations(blogPostsTags, ({ one }) => ({
  blogPost: one(blogPosts),
  tag: one(blogPostsTags),
}));

export const comments = mysqlTable("comment", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  replyTo: bigint("replyTo", { mode: "number" }),
  content: varchar("content", { length: 5000 }),
});

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users),
  replyTo: one(comments),
}));

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
  role: mysqlEnum("role", ["ADMIN", "COMMENTATOR"]).default("COMMENTATOR"),
});

export const usersRelations = relations(users, ({ many }) => ({
  blogPosts: many(blogPosts),
  comments: many(comments),
  sessions: many(sessions),
  verificationTokens: many(verificationTokens),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
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

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const messages = mysqlTable("message", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  message: text("message").notNull(),
});

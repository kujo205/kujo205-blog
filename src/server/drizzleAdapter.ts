import { and, eq } from "drizzle-orm";
import { type MySqlDatabase } from "drizzle-orm/mysql-core";
import * as schema from "@/server/db/schema";

import type { Adapter, AdapterUser, AdapterSession } from "next-auth/adapters";

export function drizzleAdapter(
  client: InstanceType<typeof MySqlDatabase>,
): Adapter {
  const { users, accounts, sessions, verificationTokens } = schema;

  return {
    async createUser(data) {
      const id = crypto.randomUUID();

      await client.insert(users).values({ ...data, id });

      return (await client
        .select()
        .from(users)
        .where(eq(users.id, id))
        .then((res) => res[0])) as AdapterUser;
    },
    async getUser(data) {
      console.log("getUser", data);
      const thing =
        (await client
          .select()
          .from(users)
          .where(eq(users.id, data))
          .then((res) => res[0])) ?? null;

      return thing;
    },
    async getUserByEmail(data) {
      console.log("getUserByEmail", data);
      const user =
        (await client
          .select()
          .from(users)
          .where(eq(users.email, data))
          .then((res) => res[0])) ?? null;

      return user;
    },
    async createSession(data) {
      await client.insert(sessions).values(data);

      return (await client
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .then((res) => res[0])) as AdapterSession;
    },
    async getSessionAndUser(data) {
      const sessionAndUser =
        (await client
          .select({
            session: sessions,
            user: users,
          })
          .from(sessions)
          .where(eq(sessions.sessionToken, data))
          .innerJoin(users, eq(users.id, sessions.userId))
          .then((res) => res[0])) ?? null;

      return sessionAndUser;
    },
    async updateUser(data) {
      if (!data.id) {
        throw new Error("No user id.");
      }

      await client.update(users).set(data).where(eq(users.id, data.id));

      return (await client
        .select()
        .from(users)
        .where(eq(users.id, data.id))
        .then((res) => res[0])) as AdapterUser;
    },
    async updateSession(data) {
      console.log("updateSession", data);
      await client
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken));

      return await client
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .then((res) => res[0]);
    },
    async linkAccount(rawAccount) {
      await client.insert(accounts).values(rawAccount);
    },
    async getUserByAccount(account) {
      const dbAccount =
        (await client
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.providerAccountId, account.providerAccountId),
              eq(accounts.provider, account.provider),
            ),
          )
          .leftJoin(users, eq(accounts.userId, users.id))
          .then((res) => res[0])) ?? null;

      if (!dbAccount) {
        return null;
      }

      return dbAccount.user;
    },
    async deleteSession(sessionToken) {
      const session =
        (await client
          .select()
          .from(sessions)
          .where(eq(sessions.sessionToken, sessionToken))
          .then((res) => res[0])) ?? null;

      await client
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken));

      return session;
    },
    async createVerificationToken(token) {
      await client.insert(verificationTokens).values(token);

      return await client
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.identifier, token.identifier))
        .then((res) => res[0]);
    },
    async useVerificationToken(token) {
      try {
        const deletedToken =
          (await client
            .select()
            .from(verificationTokens)
            .where(
              and(
                eq(verificationTokens.identifier, token.identifier),
                eq(verificationTokens.token, token.token),
              ),
            )
            .then((res) => res[0])) ?? null;

        await client
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token),
            ),
          );

        return deletedToken;
      } catch (err) {
        throw new Error("No verification token found.");
      }
    },
    async deleteUser(id) {
      const user = await client
        .select()
        .from(users)
        .where(eq(users.id, id))
        .then((res) => res[0] ?? null);

      await client.delete(users).where(eq(users.id, id));

      return user;
    },
    async unlinkAccount(account) {
      await client
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider),
          ),
        );

      return undefined;
    },
  };
}

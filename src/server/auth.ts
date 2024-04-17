import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import drizzleAdapter from "@/server/drizzleAdapter";
import { env } from "@/env";
import { type TPostSchema } from "@/schemas/post";
import { type UserRole } from "@/server/db/schema";
import { cookies } from "next/headers";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    token: string;
    user: {
      id: string;
      role: UserRole;
      editorProps?: TPostSchema;
      // ...other properties
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user, token, trigger }) => {
      const sessionId = cookies().get("next-auth.session-token")?.value;

      return {
        ...session,
        token: sessionId ?? "",
        user: {
          ...session.user,
          ...user,
        },
      };
    },
  },

  adapter: drizzleAdapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

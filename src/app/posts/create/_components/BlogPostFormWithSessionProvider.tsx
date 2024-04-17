"use client";
import { SessionProvider } from "next-auth/react";
import { BlogPostForm } from "../../_components/BlogpostForm";
import { type Session } from "next-auth";

function BlogPostFormWithSessionProvider({
  session,
}: {
  session: Session | null;
}) {
  return (
  );
}

export { BlogPostFormWithSessionProvider };

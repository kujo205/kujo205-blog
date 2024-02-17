"use client";
import { useState } from "react";
import { BlogPostForm } from "@/app/posts/_components/blogpost-form";

export default function Page() {
  const [editorValue, setEditorValue] = useState("");

  return <BlogPostForm></BlogPostForm>;
}

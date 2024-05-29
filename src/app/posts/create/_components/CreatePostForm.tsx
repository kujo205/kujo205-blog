"use client";
import {
  type BlogpostFormProps,
  BlogPostForm,
} from "@/app/posts/_components/BlogpostForm";

import { api } from "@/trpc/react";
import { toast } from "sonner";
import { type TPostSchema } from "@/schemas/post";

interface CreatePostFormProps
  extends Omit<BlogpostFormProps, "submitHandler"> {}

function CreatePostForm(props: CreatePostFormProps) {
  const { mutate: createPost } = api.post.createPost.useMutation();

  function createPostHandler(post: TPostSchema) {
    createPost(
      { post },
      {
        onSuccess: () => {
          toast.success("Post created successfully");
        },
      },
    );
  }

  return (
    <BlogPostForm
      resetAfterSubmission={true}
      saveFormToSession={true}
      submitHandler={createPostHandler}
      {...props}
    />
  );
}

export { CreatePostForm };

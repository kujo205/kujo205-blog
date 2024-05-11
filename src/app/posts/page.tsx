"use client";
import { api } from "@/trpc/react";
import { PostSearch } from "./_components/PostSearch";
import { useState } from "react";

export default function Page() {
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  const { data: postsResponse } = api.post.getPosts.useQuery({
    page: 0,
    pageSize: 300,
    search: "P",
    tagIds: selectedTagIds,
  });

  return (
    <main className="flex flex-col items-center px-[16px] py-[62px]">
      <PostSearch
        setSelectedTagIds={setSelectedTagIds}
        selectedTagIds={selectedTagIds}
      />
      {JSON.stringify(postsResponse, undefined, 2)}
      {/*{postsResponse.left}*/}
      <h1>Working on it cap</h1>
    </main>
  );
}

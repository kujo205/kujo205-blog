"use client";

import { api } from "@/trpc/react";
import { PostSearch } from "./_components/PostSearch";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function Page() {
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 300);

  function handleSearchValueChange(value: string) {
    setSearch(value);
  }

  const { data: postsResponse, refetch } = api.post.getPosts.useInfiniteQuery({
    page: 0,
    pageSize: 5,
    search: debouncedSearch,
    tagIds: selectedTagIds,
  });
  //
  // const { data: postsResponse, refetch } = api.post.getPosts.useQuery(
  //   {
  //     cursor: 0,
  //     page: 0,
  //     pageSize: 5,
  //     search: debouncedSearch,
  //     tagIds: selectedTagIds,
  //   },
  //   // {
  //   //   getNextPageParam: (lastPage) =>
  //   // },
  // );

  return (
    <main className="flex flex-col items-center px-4 py-16">
      <PostSearch
        onSearchBtnClick={() => {
          refetch();
        }}
        handleSearchValueChange={handleSearchValueChange}
        setSelectedTagIds={setSelectedTagIds}
        selectedTagIds={selectedTagIds}
      />
      {JSON.stringify(postsResponse, undefined, 2)}
      {/*{postsResponse.left}*/}
      <h1>Working on it cap</h1>
    </main>
  );
}

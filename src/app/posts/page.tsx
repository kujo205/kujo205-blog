"use client";
import { useInView } from "react-intersection-observer";
import { BlogPostCard } from "./_components/BlogPostCard";
import { api } from "@/trpc/react";
import { PostSearch } from "./_components/PostSearch";
import { useState } from "react";
import { useDebounce } from "use-debounce";
const PAGE_SIZE = 9;

export default function Page() {
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 300);

  function handleSearchValueChange(value: string) {
    setSearch(value);
  }
  const {
    data: postsResponse,
    refetch,
    fetchNextPage,
  } = api.post.getPosts.useInfiniteQuery(
    {
      pageSize: PAGE_SIZE,
      search: debouncedSearch,
      tagIds: selectedTagIds,
    },
    {
      initialCursor: 0,
      getNextPageParam: (lastPage) => {
        const lastPost = lastPage.posts[lastPage.posts.length - 1];
        return lastPost?.id;
      },
    },
  );

  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
    onChange: () => {
      fetchNextPage();
    },
  });

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
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {postsResponse?.pages.map((page) =>
          page.posts.map((post) => <BlogPostCard key={post.id} post={post} />),
        )}
        <div ref={ref} />
      </div>
    </main>
  );
}

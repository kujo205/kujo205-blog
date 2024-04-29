import { api } from "@/trpc/server";
import { PostSearch } from "./_components/PostSearch";

export default async function Page() {
  const postsResponse = await api.post.getPosts.query({
    page: 0,
    pageSize: 10,
    search: "w",
    tagIds: [1, 2],
  });

  const tags = await api.post.getAllTags.query();

  return (
    <main className="flex flex-col items-center px-[16px] py-[62px]">
      <PostSearch tags={tags} />
      <span>{JSON.stringify(postsResponse, undefined, 2)}</span>
      {postsResponse.left}
      <h1>Working on it cap</h1>
    </main>
  );
}

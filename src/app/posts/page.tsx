import { api } from "@/trpc/server";
export default async function Page() {
  const resonse = await api.post.getPosts.query({
    page: 0,
    pageSize: 10,
    search: "Post",
    tagIds: [1, 2, 3],
  });

  return (
    <section>
      <pre>{JSON.stringify(resonse.posts, undefined, 2)}</pre>
      {resonse.left}
      <h1>Working on it cap</h1>
    </section>
  );
}

import { api } from "@/trpc/server";
export default async function Page() {
  const resonse = await api.post.getPosts.query({
    page: 1,
    pageSize: 10,
    tagIds: [1, 2, 3],
  });

  return (
    <section>
      {resonse.left}
      <h1>Working on it cap</h1>
    </section>
  );
}

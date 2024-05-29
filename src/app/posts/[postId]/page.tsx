import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { MdPreview } from "@/components/mdPreview";
import { PreviewMenu } from "@/app/posts/[postId]/_components/PreviewMenu";

export default async function Page(props: { params: { postId: string } }) {
  const postId = props.params.postId;

  const { post } = await api.post.getPostById.query({ postId: Number(postId) });

  if (!post) return notFound();

  return (
    <main className="flex flex-col items-center py-20">
      <div className="max-lg:w-[95%] lg:w-[1200px]">
        <section className="relative flex w-full gap-10">
          <MdPreview
            className="w-[70%]"
            content={post.content!}
            title={post.title!}
          />
          <PreviewMenu mdContent={post.content!} />
        </section>

        <section>Comments gonna be here</section>
      </div>
    </main>
  );
}

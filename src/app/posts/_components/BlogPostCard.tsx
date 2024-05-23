import { type TBlogPost, type TTag } from "@/server/db/schema";
import { Icons } from "@/components/icons";
import Link from "next/link";
const PLACEHOLDER_IMAGE_URL = "/placeholder-blogpost-img.png";

export function BlogPostCard({
  post,
}: {
  post: Omit<TBlogPost, "content"> & { tags: TTag[] };
}) {
  const updatedAt = new Date(post.updatedAt!).toLocaleDateString();

  return (
    <Link href={`/posts/${post.id}`}>
      <article className="max-w-[512px] overflow-hidden rounded-2xl border border-gray-500  bg-slate-50">
        <img
          src={post.thumbnail ?? PLACEHOLDER_IMAGE_URL}
          className="h-[280px] w-full object-cover"
        />
        <div className="flex flex-col gap-4 overflow-hidden p-4">
          <div>
            <h1 className="text-2xl font-bold text-violet-600">{post.title}</h1>
            {/* actions */}
            <div></div>
          </div>
          <p>{post.description}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-purple-accent border-purple-accent rounded-[12px] border px-5 py-2"
              >
                {tag.name}
              </span>
            ))}
          </div>
          {/* meta information */}
          <div className="flex justify-between">
            <span className="text-gray-neutral flex gap-2">
              <Icons.Eye />
              {post.watched}
            </span>
            <span>
              Last edited:
              <span className="font-bold text-pink-500">
                {formatISOString(updatedAt)}
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function formatISOString(date: string) {
  return `  ${new Date(date).toLocaleDateString().toString()}`;
}

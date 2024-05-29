import { MDX } from "./components/MDX";
import { type TPostSchema } from "@/schemas/post";
import { cn } from "@/lib/utils";

interface MdPreviewProps extends Pick<TPostSchema, "content" | "title"> {
  className?: string;
}

function MdPreview({ content, title, className }: MdPreviewProps) {
  return (
    <article className={cn("flex flex-col gap-[32px]", className)}>
      <h1 className="text-3xl font-bold">{title}</h1>
      <div>
        <MDX source={content} />
      </div>
    </article>
  );
}

export { MdPreview };

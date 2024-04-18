import components from "./components";
import { MDXRemote } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";

interface MDXProps {
  source: string;
  className?: string;
}

function MDX({ className, source }: MDXProps) {
  return (
    <div className={cn("prose prose-slate", className)}>
      <MDXRemote source={source} components={components} />
    </div>
  );
}

export { MDX };

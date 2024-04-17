import { BlogPostForm } from "src/app/posts/_components/BlogpostForm";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PreviewTabTrigger, EditorTabTrigger } from "./_components/TabTriggers";
import { api } from "@/trpc/server";
import { type TPostSchema } from "@/schemas/post";
import { serialize } from "next-mdx-remote/serialize";
import gfm from "remark-gfm";
import ms from "ms";

export default async function Page({
  searchParams: { tab },
}: {
  searchParams: { tab: string };
}) {
  const data = await api.post.getPostValuesFromSession.query();
  // @ts-expect-error: types suck
  const defaultFormValues = data[0].postFormValues as TPostSchema;
  let mdxSource;

  try {
    mdxSource = await serialize(defaultFormValues.content, {
      // mdxOptions: {
      //   remarkPlugins: [gfm],
      // },
    });
  } catch (e) {
    console.log("error", e);
  }

  return (
    <main className="flex flex-col items-center p-4">
      <Tabs defaultValue="editor" className="max-lg:w-[95%] lg:w-[1200px]">
        <TabsList className="self-start">
          <EditorTabTrigger />
          <PreviewTabTrigger />
        </TabsList>
        <TabsContent value="editor">
          <BlogPostForm defaultValues={defaultFormValues} />
        </TabsContent>
        <TabsContent value="preview">
          {mdxSource && <MDXRemote source={mdxSource} />}
          Change your password here.
        </TabsContent>
      </Tabs>
    </main>
  );
}

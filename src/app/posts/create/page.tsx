import { BlogPostForm } from "src/app/posts/_components/BlogpostForm";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
import { PreviewTabTrigger, EditorTabTrigger } from "./_components/TabTriggers";
import { api } from "@/trpc/server";
import { type TPostSchema } from "@/schemas/post";
import { MdPreview } from "@/components/mdPreview";
import { CreatePostForm } from "./_components/CreatePostForm";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams: { tab },
}: {
  searchParams: { tab: string };
}) {
  const data = await api.post.getPostValuesFromSession.query();
  // @ts-expect-error: types suck
  const defaultFormValues = data[0].postFormValues as TPostSchema;

  return (
    <main className="flex flex-col items-center p-4">
      <Tabs
        defaultValue={tab ?? "editor"}
        className="max-lg:w-[95%] lg:w-[1200px]"
      >
        <TabsList className="self-start">
          <EditorTabTrigger />
          <PreviewTabTrigger />
        </TabsList>
        <TabsContent value="editor">
          <CreatePostForm defaultValues={defaultFormValues} />
        </TabsContent>
        <TabsContent value="preview">
          <MdPreview
            content={defaultFormValues.content}
            title={defaultFormValues.title}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}

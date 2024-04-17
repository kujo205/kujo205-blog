"use client";
import { useRouter } from "next/navigation";
import { TabsTrigger } from "@/components/ui/tabs";

function EditorTabTrigger() {
  const router = useRouter();

  return (
    <TabsTrigger
      value="editor"
      onClick={() => {
        router.push("/posts/create?tab=editor");
      }}
    >
      Editor
    </TabsTrigger>
  );
}

function PreviewTabTrigger() {
  const router = useRouter();

  return (
    <TabsTrigger
      value="preview"
      onClick={() => {
        router.push("/posts/create?tab=preview");
      }}
    >
      Preview
    </TabsTrigger>
  );
}

export { EditorTabTrigger, PreviewTabTrigger };

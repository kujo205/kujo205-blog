"use client";
import { useState } from "react";
import { MdEditor } from "@/components/mdEditor";

export default function Page() {
  const [editorValue, setEditorValue] = useState("adsadasdasdas");

  return (
    <div>
      <MdEditor
        setEditorValue={setEditorValue}
        value={editorValue}
        onChange={(event) => {
          console.log(event.target.value);
        }}
      ></MdEditor>
    </div>
  );
}

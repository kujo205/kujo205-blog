"use client";
import { type TextareaProps } from "@/components/ui/textarea";
import { useState, useRef, type Dispatch, type SetStateAction } from "react";
import { api } from "@/trpc/react";
import axios from "axios";

interface MdEditorProps extends Omit<TextareaProps, "onChange"> {
  onChange: NonNullable<TextareaProps["onChange"]>;
  value: string;
  setEditorValue: Dispatch<SetStateAction<string>>;
}

function MdEditor({
  onChange,
  value,
  setEditorValue,
  ...other
}: MdEditorProps) {
  const [lineCount, setLineCount] = useState(getLineCount(value));
  const textarea = useRef<HTMLTextAreaElement>(null);
  const { mutateAsync: getUrl } =
    api.post.getStandardUploadPreassignedUrl.useMutation();

  const handleAddImage: TextareaProps["onPaste"] = async (event) => {
    const file = event.clipboardData.files[0];
    if (!file) return;

    const imageName = `${file.name}-${Date.now()}`;
    setEditorValue((prev) => prev + ` [${imageName}](Loading...) `);

    const { presignedUrl, accessUrl } = await getUrl({
      imageName: imageName,
    });

    try {
      const response = await axios.put(presignedUrl, file.slice(), {
        headers: {
          "Content-Type": file.type,
        },
      });
      console.log("response", response);
    } catch (err) {
      console.error(err);
    }

    setEditorValue((prev) =>
      prev.replace(
        ` [${imageName}](Loading...) `,
        ` [${imageName}](${accessUrl}) `,
      ),
    );
  };

  return (
    <div className="inline-flex h-[500px] w-full gap-[10px] overflow-auto rounded border-[1px] border-solid border-gray-300 font-mono text-lg">
      <LineCount lineNumber={lineCount} />
      <textarea
        onPaste={handleAddImage}
        ref={textarea}
        className="h-[9999px] w-full resize-none overflow-y-hidden border-0 p-0 py-[8px] text-lg outline-0"
        {...other}
        onChange={(event) => {
          setEditorValue(event.target.value);
          setLineCount(getLineCount(event.target.value));
          onChange(event);
        }}
        onKeyDown={(event) => {
          if (event.key === "Tab" && textarea.current) {
            const start = textarea.current.selectionStart;
            const end = textarea.current.selectionEnd;

            textarea.current.value =
              textarea.current.value.substring(0, start) +
              "\t" +
              textarea.current.value.substring(end);
            textarea.current.focus();

            event.preventDefault();
          }
        }}
        value={value}
      />
    </div>
  );
}

function LineCount({ lineNumber }: { lineNumber: number }) {
  const lines = Array.from({ length: lineNumber }, (_, i) => i + 1);

  return (
    <div className="flex h-[9999px] flex-col items-end bg-fuchsia-300 px-2 py-[8px] text-gray-500">
      {lines.map((line) => (
        <span key={line}>
          {line.toString().length === 1 ? line.toString() + " " : line}
        </span>
      ))}
    </div>
  );
}
function getLineCount(value: string) {
  return value.split("\n").length;
}

export { MdEditor };

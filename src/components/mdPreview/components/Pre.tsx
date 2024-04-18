"use client";
import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type PreChildren = {
  props: {
    className: string;
  };
};

const Pre: React.FC<
  DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
> = ({ children, ...props }) => {
  const lang = (children as PreChildren).props.className.split("-")[1];

  const { copy } = useCopyToClipboard();

  return (
    <div className="rounded-t-[8px] bg-[#2D2D2D]">
      <div className="flex items-center justify-between px-[1rem]">
        <span>
          <span className="text-[#A9B1D6]">{lang}</span>
        </span>
        <Button
          className="bg-transparent opacity-75 hover:bg-transparent hover:opacity-100"
          onClick={() => copy("children", "Text copied to clipboard")}
        >
          <CopyIcon />
        </Button>
      </div>
      <pre {...props} className="my-0 rounded-t-none border-t">
        {children}
      </pre>
    </div>
  );
};

export { Pre };

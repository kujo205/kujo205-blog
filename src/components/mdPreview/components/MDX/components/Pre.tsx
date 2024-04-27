"use client";
import { type DetailedHTMLProps, type HTMLAttributes, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { copy } from "@/hooks/useCopyToClipboard";

type PreChildren = {
  props: {
    className: string;
    children: string;
  };
};

const Pre: React.FC<
  DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
> = ({ children, ...props }) => {
  const [isCopying, setIsCopying] = useState(false);
  const lang = (children as PreChildren).props.className.split("-")[1];
  const preContent = (children as PreChildren).props.children;

  return (
    <div className="rounded-t-[8px] bg-[#2D2D2D]">
      <div className="flex items-center justify-between px-[1rem]">
        <span>
          <span className="text-[#A9B1D6]">{lang}</span>
        </span>
        <div className="flex h-[40px] items-center">
          {isCopying ? (
            <span className="text-[#A9B1D6]">Copied!</span>
          ) : (
            <Button
              className="bg-transparent opacity-75 hover:bg-transparent hover:opacity-100"
              onClick={() => {
                setIsCopying(true);
                copy(preContent);
                setTimeout(() => setIsCopying(false), 1500);
              }}
            >
              <CopyIcon />
            </Button>
          )}
        </div>
      </div>
      <pre {...props} className="my-0 rounded-t-none border-t">
        {children}
      </pre>
    </div>
  );
};

export { Pre };

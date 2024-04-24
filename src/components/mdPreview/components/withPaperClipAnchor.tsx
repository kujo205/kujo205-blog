"use client";

import { PaperclipIcon } from "lucide-react";

export function withPaperClipAnchor<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
) {
  return function WithPaperClipAnchor(props: P) {
    return (
      <div className="flex gap-[4px]">
        <PaperclipIcon />
        <Component {...props} />
      </div>
    );
  };
}

"use client";
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { kebabCase } from "@/lib/textIntoKebabNotation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type DetailedProps<T> = DetailedHTMLProps<HTMLAttributes<T>, T>;

import { PaperclipIcon } from "lucide-react";

export function withPaperClipAnchor<
  P extends JSX.IntrinsicAttributes & { children: ReactNode },
>(Component: React.ComponentType<P>) {
  function WithPaperClipAnchor(props: P) {
    const { copy } = useCopyToClipboard();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const headerId = kebabCase(props.children as string);

    function handleHeadingClick() {
      const urlWithHeadingId =
        pathName + "?" + searchParams.toString() + `#${headerId}`;
      const fullLink = window.location.origin + urlWithHeadingId;

      router.push(urlWithHeadingId, {
        scroll: false,
      });
      copy(fullLink, `Link copied to clipboard`);
    }

    return (
      <div className="flex items-center gap-[4px]">
        <i
          className="accent-text cursor-pointer opacity-50 hover:opacity-100"
          onClick={() => handleHeadingClick()}
        >
          <PaperclipIcon />
        </i>
        <Component {...props} className="my-[0px]" id={headerId} />
      </div>
    );
  }

  return WithPaperClipAnchor;
}

export const H1Component = withPaperClipAnchor(
  (props: DetailedProps<HTMLHeadingElement>) => <h1 {...props} />,
);

export const H2Component = withPaperClipAnchor(
  (props: DetailedProps<HTMLHeadingElement>) => <h2 {...props} />,
);

export const H3Component = withPaperClipAnchor(
  (props: DetailedProps<HTMLHeadingElement>) => <h3 {...props} />,
);

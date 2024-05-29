"use client";
import { useLayoutEffect, type ReactNode } from "react";
import Prism from "prismjs";

import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-asm6502";
import "prismjs/components/prism-bash";
import { usePathname, useSearchParams } from "next/navigation";

function PrismJsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = searchParams.toString();

  useLayoutEffect(() => {
    Prism.highlightAll();
  }, [pathname, params]);

  return <>{children}</>;
}

export default PrismJsProvider;

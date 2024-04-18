"use client";
import { useEffect, type ReactNode } from "react";
import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-bash";
import { usePathname, useSearchParams } from "next/navigation";

function PrismJsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = searchParams.toString();

  useEffect(() => {
    console.log("highlighting code", params, pathname);
    Prism.highlightAll();
  }, [pathname, params]);

  return <>{children}</>;
}

export default PrismJsProvider;

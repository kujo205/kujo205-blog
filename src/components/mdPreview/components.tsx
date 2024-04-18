"use client";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

type TComponents = MDXRemoteProps["components"];

const components: TComponents = {
  pre: ({ children, ...props }) => {
    console.log("props", props);

    return <>{children}</>;
  },
};

export default components;

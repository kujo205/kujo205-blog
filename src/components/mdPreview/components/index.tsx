import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { Pre } from "./Pre";

type TComponents = MDXRemoteProps["components"];

const index: TComponents = {
  pre: Pre,
};

export default index;

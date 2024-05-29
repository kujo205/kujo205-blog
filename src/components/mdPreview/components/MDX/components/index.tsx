import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { Pre } from "./Pre";
import {
  H1Component,
  H2Component,
  H3Component,
} from "@/components/mdPreview/components/MDX/components/HTags";

type TComponents = MDXRemoteProps["components"];

const index: TComponents = {
  pre: Pre,
  h1: H1Component,
  h2: H2Component,
  h3: H3Component,
};

export default index;

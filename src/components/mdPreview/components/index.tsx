import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { Pre } from "./Pre";
import { withPaperClipAnchor } from "./withPaperClipAnchor";

type TComponents = MDXRemoteProps["components"];

const index: TComponents = {
  pre: Pre,
  h1: (props) => {
    return <h1 className="font-bol devd text-4xl" {...props} />;
  },
};

export default index;

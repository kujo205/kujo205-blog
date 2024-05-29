import Link from "next/link";

interface MenuItemProps {
  offset: number;
  title: string;
  href: string;
  highlighted?: boolean;
}

export function MenuItem({ title, href, highlighted, offset }: MenuItemProps) {
  console.log("highlighted", highlighted);

  return (
    <Link
      href={href}
      scroll={true}
      className={`text-${highlighted ? "violet-600" : "black"} text-lg`}
      style={{ paddingLeft: `${offset * 8}px` }}
    >
      {title}
    </Link>
  );
}

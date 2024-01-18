import { Button } from "@/components/ui/button";
import Link from "next/link";
import { header } from "@/config/general";
const Nav = () => {
  return (
    <nav>
      {header.map((navItem) => (
        <Link href={navItem.url} key={navItem.url}>
          <Button variant="outline-black">
            <a>{navItem.name}</a>
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export const Header = () => {
  return (
    <header>
      <Link></Link>
      <Nav />
    </header>
  );
};

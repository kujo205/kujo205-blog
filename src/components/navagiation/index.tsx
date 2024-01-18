import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { header } from "@/config/general";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { socialMediaLinks } from "@/config/general";
import { NavProgressBar } from "@/components/ui/progress";

const Nav = () => {
  return (
    <nav className="flex gap-8">
      {header.map((navItem) => (
        <Link href={navItem.url} key={navItem.url}>
          <Button variant="outline-black" size="sm">
            {navItem.name}
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export const Header = () => {
  return (
    <div className="sticky top-0 bg-[rgba(255,255,255,.5)] backdrop-blur">
      <header className="flex justify-between px-32 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="cursor-pointer">
            <Image
              src="/ivan.png"
              alt="Ivan, the fullstack developer"
              width={100}
              height={100}
            ></Image>
          </Avatar>
          <p className="text-xl font-bold uppercase">Ivan Kuts</p>
        </div>

        <Nav />
        <Link href={socialMediaLinks.linkedin}>
          <Button variant="ghost" className="flex gap-1">
            <Icons.SocialMedia.Linkedin width={24} height={24} />
            Connect with me on Linkedin
          </Button>
        </Link>
      </header>
      <NavProgressBar />
    </div>
  );
};

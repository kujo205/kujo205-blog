import { header, socialMediaLinks } from "@/config/general";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { NavProgressBar } from "@/components/ui/progress";
import { OpenMobileHeaderButtonAndMobileHeader } from "@/components/navagiation/mobile-header";

const DesktopNav = () => {
  return (
    <nav className="hidden gap-4 md:flex">
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
    <header className="sticky top-0 bg-[rgba(255,255,255,.5)] backdrop-blur">
      <section className="sm: flex justify-between px-12 py-4 lg:px-32">
        <Link href={"/"}>
          <div className="flex cursor-pointer items-center gap-3">
            <Avatar>
              <Image
                src="/ivan.png"
                alt="Ivan, the fullstack developer"
                width={100}
                height={100}
              ></Image>
            </Avatar>
            <p className="text-xl font-bold uppercase">Ivan Kuts</p>
          </div>
        </Link>
        <DesktopNav />
        <Link href={socialMediaLinks.linkedin}>
          <Button variant="ghost" className="hidden gap-1 md:flex">
            <Icons.SocialMedia.Linkedin width={24} height={24} color="dark" />
            Connect with me on Linkedin
          </Button>
        </Link>
        <OpenMobileHeaderButtonAndMobileHeader />
      </section>
      <NavProgressBar />
    </header>
  );
};

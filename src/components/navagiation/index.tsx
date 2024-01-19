import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { header } from "@/config/general";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { socialMediaLinks } from "@/config/general";
import { NavProgressBar } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
    <header className="sticky top-0 bg-[rgba(255,255,255,.5)] backdrop-blur">
      <section className="flex justify-between px-32 py-4">
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
            <Icons.SocialMedia.Linkedin width={24} height={24} color="dark" />
            Connect with me on Linkedin
          </Button>
        </Link>
      </section>
      <NavProgressBar />
    </header>
  );
};

const SocialMedia = () => {
  return (
    <div className="flex gap-2 pb-9">
      <Link href={socialMediaLinks.github}>
        <Icons.SocialMedia.Github
          width={24}
          height={24}
        ></Icons.SocialMedia.Github>
      </Link>
      <Link href={socialMediaLinks.linkedin}>
        <Icons.SocialMedia.Linkedin
          width={24}
          height={24}
        ></Icons.SocialMedia.Linkedin>
      </Link>
      <Link href={socialMediaLinks.telegram}>
        <Icons.SocialMedia.Telegram
          width={24}
          height={24}
        ></Icons.SocialMedia.Telegram>
      </Link>
      <Link href={socialMediaLinks.instagram}>
        <Icons.SocialMedia.Instagram
          width={24}
          height={24}
        ></Icons.SocialMedia.Instagram>
      </Link>
    </div>
  );
};
export const Footer = () => {
  const curentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col bg-black px-[120px] py-12 font-bold text-white">
      <section className="flex justify-between">
        <div>
          <p className="text-2xl uppercase ">ivan kuts</p>
          <p className="text-base font-medium">
            An ambitious fully-stacked developer
          </p>
        </div>
        <div>
          <p className="bg-gradient-to-r from-[#4F3ABA] to-[#D94E68] bg-clip-text text-2xl font-bold uppercase text-transparent">
            social media
          </p>
          <SocialMedia />
        </div>
      </section>
      <Separator className="bg-gray-700" />
      <section className="pt-9 text-center">
        © Copyright {curentYear}. Made with ❤️
      </section>
    </footer>
  );
};

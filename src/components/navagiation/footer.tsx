"use client";
import Link from "next/link";
import { socialMediaLinks } from "@/config/general";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

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
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col bg-black px-12 py-12 font-bold text-white lg:px-32">
      <section className="flex justify-between">
        <div>
          <div>
            <span className="text-2xl uppercase ">ivan kuts</span>
            <Button
              variant="link"
              className="text-zinc-600"
              onClick={() => {
                console.log("wtf man");
                signIn("google");
              }}
            >
              Log in as admin
            </Button>
            <Button
              variant="link"
              className="text-zinc-600"
              onClick={() => signOut()}
            >
              Log out
            </Button>
          </div>
          <p className="text-base font-medium">
            An ambitious fully-stacked web-developer
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
        © Copyright {currentYear}. Made with ❤️
      </section>
    </footer>
  );
};

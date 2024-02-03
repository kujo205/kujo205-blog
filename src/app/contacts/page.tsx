import { Button } from "@/components/ui/button";
import Link from "next/link";
import { socialMediaLinks } from "@/config/general";
import { Icons } from "@/components/icons";
import { ContactMeForm } from "@/app/contacts/_components/ContactMeForm";
import { getServerAuthSession } from "@/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <section className="flex flex-col gap-6 px-3 py-[90px] md:m-auto">
      <div>
        <h2 className="mb-2 text-2xl font-bold">
          You can find me on these platforms:
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href={socialMediaLinks.telegram}>
            <Button>
              <Icons.SocialMedia.Telegram
                width={20}
                height={20}
                className="mr-2"
              />
              Telegram
            </Button>
          </Link>

          <Link href={socialMediaLinks.instagram}>
            <Button>
              <Icons.SocialMedia.Instagram
                width={20}
                height={20}
                className="mr-2"
              />
              Instagram
            </Button>
          </Link>

          <Link href={socialMediaLinks.github}>
            <Button>
              <Icons.SocialMedia.Github
                width={20}
                height={20}
                className="mr-2"
              />
              Github
            </Button>
          </Link>

          <Link href={socialMediaLinks.linkedin}>
            <Button>
              <Icons.SocialMedia.Linkedin
                width={20}
                height={20}
                className="mr-2"
              />
              LinkedIn
            </Button>
          </Link>
        </div>
      </div>
      <ContactMeForm user={session?.user} />
    </section>
  );
}

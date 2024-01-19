import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Button } from "@/components/ui/button";

const tecnologies = [
  "CSS",
  "NextJs",
  "React",
  "JavaScript",
  "Typescript",
  "TailwindCSS",
  "Git",
  "C++",
  "bash",
  "SCSS",
  "HTML",
  "Express",
  "Electron",
  "MUI",
  "Radix-ui",
];
export default async function Home() {
  // noStore();
  //const hello = await api.post.hello.query({ text: "from tRPC" });
  //const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center text-base">
      <section className="bg-wave flex h-[800px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-8 rounded-3xl border-2 border-solid border-black bg-white p-6">
          <h2 className="text-4xl font-bold">Hey, I'm Ivan Kuts</h2>
          <div className="text-xl">
            <p>
              I am a <span className="accent-text">software engineer</span> and
              <span className="accent-text"> full-stack web developer</span> ,
              keen on
            </p>
            <p>
              solving complex tasks, I’ve been programming since{" "}
              <span className="accent-text"> 15 years.</span>
            </p>
            <p className="mt-4">
              I’m pursuing a software engineering degree as a sophomore student
            </p>
            <p>
              at <span className="accent-text">Kyiv Polytechnic Institute</span>
            </p>
          </div>
          <Link href={"/posts"}>
            <Button size="lg" className="font-bold">
              Check out my blog
            </Button>
          </Link>
        </div>
      </section>
      <section className="flex flex-col gap-8 bg-black px-[60px] py-[120px] text-white md:px-[120px]">
        <h2 className="text-4xl font-bold">My life story and hard skills</h2>
        <div>
          I was very keen on learning ever since my childhood. I used to be an
          excellent student in school and so do in my university. Programming
          came to my eye relatively early (in 6-7th form), but , unfortunately,
          I didn't have an appropriate computer back then, that's why i decided
          to double down on my Math and English skills. I started off as a
          front-end developer. Now I’m expanding my knowledge to become a
          full-stack
        </div>
        <div className="flex flex-wrap gap-2">
          {tecnologies.map((technology) => {
            return (
              <Badge key={technology} variant="secondary">
                {technology}
              </Badge>
            );
          })}
        </div>
      </section>
    </main>
  );
}

"use client";

import { Icons } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";
import { type TProject } from "@/config/projects";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
interface ProjectCardProps {
  project: TProject;
}
const ProjectCard = ({ project }: ProjectCardProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function handleCircleSelected(index: number) {
    if (!api) {
      return;
    }

    api.scrollTo(index);
  }

  return (
    <Card className="p-[20px]">
      <Carousel setApi={setApi} className="relative overflow-hidden rounded-xl">
        <CarouselContent>
          {project.images.map((image) => (
            <CarouselItem key={image}>
              <Image
                width={500}
                height={500}
                src={image}
                alt={project.title}
                className="aspect-[2/1.3] object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex h-[20px] items-center justify-center gap-1 bg-sky-950">
          {project.images.map((image, index) => (
            <div
              className={`h-[8px] w-[8px] cursor-pointer rounded ${index === current - 1 ? "bg-white" : "bg-[#667E8F]"}`}
              key={image}
              onClick={() => handleCircleSelected(index)}
            ></div>
          ))}
        </div>
        <CarouselPrevious className="absolute left-[12px]" />
        <CarouselNext className="absolute right-[12px]" />
      </Carousel>
      <div className="mt-8 flex flex-col gap-4">
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
        <div className="flex">
          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <Link href={project.githubUrl} target="_blank">
                <Button>
                  <Icons.SocialMedia.Github
                    width={24}
                    height={24}
                    className="mr-2"
                  ></Icons.SocialMedia.Github>
                  See a repository
                </Button>
              </Link>
            )}
            {project.liveUrl && (
              <Link href={project.liveUrl} target="_blank">
                <Button variant="secondary">
                  <Icons.MousePointerClick className="mr-2" />
                  Visit a life demo
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export { ProjectCard };

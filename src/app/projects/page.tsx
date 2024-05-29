import { projects } from "@/config/projects";
import { ProjectCard } from "@/app/projects/_components/ProjectCard";

export default function Projects() {
  return (
    <main className="px-15 flex flex-col gap-8 py-20 md:px-32">
      <h1 className="self-center text-2xl font-bold">
        Here are some of my projects
      </h1>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.title} />
        ))}
      </ul>
    </main>
  );
}

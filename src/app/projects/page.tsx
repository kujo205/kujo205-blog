import { projects } from "@/config/projects";
import { ProjectCard } from "@/app/projects/_components/ProjectCard";

export default function Projects() {
  return (
    <main className="grid grid-cols-1 gap-6 px-[60px] py-[80px] sm:grid-cols-2 md:grid-cols-3 md:px-[120px]">
      {projects.map((project) => (
        <ProjectCard project={project} key={project.title} />
      ))}
    </main>
  );
}

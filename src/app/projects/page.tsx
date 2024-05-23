import { projects } from "@/config/projects";
import { ProjectCard } from "@/app/projects/_components/ProjectCard";

export default function Projects() {
  return (
    <main className="md:px-30 grid grid-cols-1 gap-6 px-16 py-20 sm:grid-cols-2 md:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard project={project} key={project.title} />
      ))}
    </main>
  );
}

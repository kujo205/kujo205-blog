const baseUrl = "pages/projects";

export type TProject = {
  title: string;
  description: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
};
export const projects = [
  {
    title: "Docutiv | medical App",
    description:
      "An ambitious healthcare start up, aimed at saving doctors time. I was finishing the app.",
    images: [
      `${baseUrl}/docutiv/0.png`,
      `${baseUrl}/docutiv/1.png`,
      `${baseUrl}/docutiv/2.png`,
      `${baseUrl}/docutiv/3.png`,
    ],
    liveUrl: "https://docutiv.com/",
  },
  {
    title: "FICT Advisor",
    description:
      "An application created by students and for students in order to make a life of average student better",
    images: [
      `${baseUrl}/fictadvisor/0.png`,
      `${baseUrl}/fictadvisor/1.png`,
      `${baseUrl}/fictadvisor/2.png`,
      `${baseUrl}/fictadvisor/3.png`,
      `${baseUrl}/fictadvisor/4.png`,
    ],
    liveUrl: "https://fictadvisor.com/",
    githubUrl: "https://github.com/fictadvisor/fictadvisor",
  },
  {
    title: "My blog",
    description:
      "My personal website, here I post all the interesting technologies I stumble upon",
    images: [`${baseUrl}/kujo205-blog/0.png`],
    liveUrl: "https://kujo205-blog.vercel.app",
    githubUrl: "https://github.com/kujo205/kujo205-blog",
  },
  {
    title: "Beer recipes",
    description:
      "A demo application, which uses API of bevereges, was created as s task for position at the company",
    images: [`${baseUrl}/beer-recipes/0.png`, `${baseUrl}/beer-recipes/1.png`],
    liveUrl: "https://beer-recipes-287e.vercel.app/",
    githubUrl: "https://github.com/kujo205/beer-recipes/tree/master",
  },
  {
    title: "Paint clone",
    description:
      "An application written as a project for Object Oriented Programming subject, in pure TypeScript, tries to mimick Paint",
    images: [`${baseUrl}/paint-clone/0.png`],
    liveUrl: "https://kpi-kujo205.github.io/2course_oop/",
    githubUrl: "https://github.com/KPI-kujo205/2course_oop/",
  },
  {
    title: "IP tracker",
    description:
      "An application which can show you a location of the IP address by the domain",
    images: [`${baseUrl}/ip-tracker/0.png`],
    liveUrl: "https://kujo205.github.io/ip-tracker/",
    githubUrl: "https://github.com/kujo205/ip-tracker",
  },
  {
    title: "Stressed syllables",
    description:
      "I made this application in order to prepare for my finals in high school",
    images: [
      `${baseUrl}/nagolosi/0.png`,
      `${baseUrl}/nagolosi/1.png`,
      `${baseUrl}/nagolosi/2.png`,
    ],
    liveUrl: "https://kujo205.github.io/nagolosi/",
    githubUrl: "https://github.com/kujo205/nagolosi",
  },
  {
    title: "Link shortener",
    description: "This application lets you shorten very long links",
    images: [`${baseUrl}/link-shortener/0.png`],
    liveUrl: "https://kujo205.github.io/shortly/",
    githubUrl: "https://github.com/kujo205/shortly?tab=readme-ov-file",
  },
];

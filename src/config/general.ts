import { type UserRole } from "@/server/db/schema";

const defaultHeader = [
  {
    name: "About",
    url: "/",
  },
  {
    name: "Blog Posts",
    url: "/posts",
  },
  {
    name: "Reach me out",
    url: "/contacts",
  },
  {
    name: "Projects",
    url: "/projects",
  },
];

const adminHeader = [
  {
    name: "Create a post",
    url: "/posts/create",
  },
];

export const getHeaderItems = (role?: UserRole | null) => {
  return role === "ADMIN" ? [...defaultHeader, ...adminHeader] : defaultHeader;
};

export const socialMediaLinks = {
  github: "https://github.com/kujo205",
  telegram: "https://t.me/kujo205",
  linkedin: "https://www.linkedin.com/in/ivan-kuts-a52114199/",
  instagram: "https://www.instagram.com/kujo205/",
};

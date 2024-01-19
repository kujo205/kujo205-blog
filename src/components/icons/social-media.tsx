import Image, { type ImageProps } from "next/image";
type TImageProps = Omit<ImageProps, "src" | "alt">;
const Github = (props: TImageProps) => (
  <Image {...props} src="/icons/github.svg" alt="github"></Image>
);
const Linkedin = ({
  color = "light",
  ...props
}: TImageProps & { color?: "light" | "dark" }) => (
  <Image {...props} src={`/icons/linkedin-${color}.svg`} alt="linkedin"></Image>
);

const Telegram = (props: TImageProps) => (
  <Image {...props} src="/icons/telegram.svg" alt="telegram"></Image>
);

const Instagram = (props: TImageProps) => (
  <Image {...props} src="/icons/instagram.svg" alt="instagram"></Image>
);
export const SocialMedia = {
  Github,
  Linkedin,
  Telegram,
  Instagram,
};

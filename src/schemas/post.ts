import z from "zod";

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
});

type TPostSchema = z.infer<typeof postSchema>;

export { postSchema, type TPostSchema };

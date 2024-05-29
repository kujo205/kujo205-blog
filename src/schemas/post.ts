import z from "zod";

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.number()),
  thumbnail: z.string().optional(),
});

type TPostSchema = z.infer<typeof postSchema>;

export { postSchema, type TPostSchema };

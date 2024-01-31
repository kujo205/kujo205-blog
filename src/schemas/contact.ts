import z from "zod";
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long." }),
  email: z.string().email(),
  message: z
    .string()
    .min(1, { message: "Message must be at least 1 character long." }),
});

export type TContactSchema = z.infer<typeof contactSchema>;

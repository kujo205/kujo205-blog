import { createTRPCRouter } from "@/server/api/trpc";
import { publicProcedure } from "@/server/api/trpc";
import { contactSchema } from "@/schemas/contact";
import { messages } from "@/server/db/schema";

export const contactRouter = createTRPCRouter({
  submitMessage: publicProcedure
    .input(contactSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      const result = await ctx.db.insert(messages).values(input);
      //TODO: add redirection to telgram bot
    }),
});

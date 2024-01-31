import { createTRPCRouter } from "@/server/api/trpc";
import { publicProcedure } from "@/server/api/trpc";
import { contactSchema } from "@/schemas/contact";
import { messages } from "@/server/db/schema";
import TelegramService from "@/server/api/services/Telegram.service";
export const contactRouter = createTRPCRouter({
  submitMessage: publicProcedure
    .input(contactSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.db.insert(messages).values(input);

      await TelegramService.sendMessage(input);
    }),
});

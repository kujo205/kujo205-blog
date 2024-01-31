import { Telegraf } from "telegraf";
import { type TContactSchema } from "@/schemas/contact";
import * as process from "process";

class TelegramService {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
  }
  public async sendMessage(contactInfo: TContactSchema) {
    await this.bot.telegram.sendMessage(
      process.env.MY_TELEGRAM_CHAT_ID!,
      this.formatMessage(contactInfo),
    );
  }

  private formatMessage(contactInfo: TContactSchema) {
    const message = `Sender 😚: ${contactInfo.name} (${contactInfo.email})\nMessage ✉️: ${contactInfo.message}`;

    return message;
  }
}

export default new TelegramService();

import { env } from "@/env";
import type TOpenAI from "openai";
import OpenAI from "openai";
import { prompts } from "./propmps";

class OpenAIService {
  private openai: TOpenAI;
  constructor() {
    this.openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });
  }

  summarize(text: string) {
    return this.openai.completions.create({
      max_tokens: 250,
      prompt: prompts.summarize(text),
      model: "gpt-3.5-turbo-instruct",
      temperature: 1,
    });
  }
}

export default new OpenAIService();

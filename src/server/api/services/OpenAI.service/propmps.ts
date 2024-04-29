export const prompts = {
  summarize: (text: string) =>
    `Summarize the following text:${text.slice(0, 400)}. Summarized text must be if no more than 50 words or 3 sentences. remove \n from response`,
};

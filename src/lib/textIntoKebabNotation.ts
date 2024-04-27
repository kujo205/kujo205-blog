export const kebabCase = (str: string) => {
  try {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
  } catch (e) {
    // TODO: add posthog or santry tracking later on
    console.error(e);
  }
};

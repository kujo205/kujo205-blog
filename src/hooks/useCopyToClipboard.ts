import { toast } from "sonner";

const useCopyToClipboard = () => {
  return {
    copy: async (text: string, toastMessage: string) => {
      await navigator.clipboard.writeText(text);
      toast.info(toastMessage);
    },
  };
};

export { useCopyToClipboard };

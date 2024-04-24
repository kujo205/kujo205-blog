import { toast } from "sonner";

const useCopyToClipboard = () => {
  return {
    copy: async (text: string, toastMessage: string) => {
      await copy(text);
      toast.info(toastMessage);
    },
  };
};

async function copy(text: string) {
  await navigator.clipboard.writeText(text);
}

export { useCopyToClipboard, copy };

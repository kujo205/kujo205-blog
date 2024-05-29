import { Upload, Delete } from "lucide-react";
import * as React from "react";
import { api } from "@/trpc/react";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface PhotoInputFieldProps {
  onPhotoChange: (href: string | undefined) => void;
  imageUrl?: string;
}

const PhotoInputField = ({ onPhotoChange, imageUrl }: PhotoInputFieldProps) => {
  const { mutateAsync: getUrl } =
    api.post.getStandardUploadPreassignedUrl.useMutation();

  const handleFileSelected = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0]!;

    const imageName = `${file.name.split(" ").join("_")}-${Date.now()}`;

    const { presignedUrl, accessUrl } = await getUrl({
      imageName: imageName,
    });

    await axios.put(presignedUrl, file?.slice(), {
      headers: {
        "Content-Type": file.type,
      },
    });

    onPhotoChange(accessUrl);
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <h3 className="text-[20px] font-semibold">Add post thumbnail</h3>
      <div className="flex h-[280px] w-[520px] items-center justify-center">
        <label
          style={{
            backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          }}
          htmlFor="dropzone-file"
          className={
            "dark:hover:bg-bray-800 bg- flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-blue-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          }
        >
          <div className="flex flex-col items-center justify-center px-5">
            <div className="flex gap-[8px]">
              <Upload />
            </div>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF
            </p>
          </div>
          <input
            accept="image/png, image/jpeg"
            id="dropzone-file"
            type="file"
            className="hidden"
            onInput={handleFileSelected}
          />
        </label>
      </div>
      <Button
        variant="default"
        className="inline-flex gap-[8px] self-start"
        type="button"
        onClick={() => {
          onPhotoChange(undefined);
        }}
      >
        Delete a thumbnail
        <Delete />
      </Button>
    </div>
  );
};

export { PhotoInputField };

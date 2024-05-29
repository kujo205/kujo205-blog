"use client";
import { type TPostSchema, postSchema } from "@/schemas/post";
import { Controller, useForm } from "react-hook-form";
import { Input, LabelWrapper } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEditor } from "@/components/mdEditor";
import { InputCombobox } from "./InputCombobox";
import { api } from "@/trpc/react";
import type { TItem } from "./InputCombobox";
import { Button } from "@/components/ui/button";
import { useDebouncedCallback } from "use-debounce";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import { PhotoInputField } from "./PhotoInputField";

const initialValues: TPostSchema = {
  content: "",
  tags: [],
  title: "New Post Title",
  thumbnail: undefined,
};

export interface BlogpostFormProps {
  defaultValues?: TPostSchema;
  submitHandler: (data: TPostSchema) => void;
  saveFormToSession?: boolean;
  resetAfterSubmission?: boolean;
}

const BlogPostForm = ({
  defaultValues,
  submitHandler,
  saveFormToSession = false,
  resetAfterSubmission = false,
}: BlogpostFormProps) => {
  defaultValues = defaultValues ?? initialValues;

  const { data: tagsOptions, refetch: refetchTags } =
    api.post.getAllTags.useQuery();
  const { mutate: addNewTag } = api.post.addTag.useMutation();
  const { mutate: savePostValuesToSession } =
    api.post.savePostValuesToSession.useMutation();

  const handlePostFormUpdate = useDebouncedCallback(
    async (postForm: TPostSchema) => {
      savePostValuesToSession({ postFormValues: postForm });
    },
    250,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
    getValues,
  } = useForm<TPostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  const titleField = watch("title");
  const tagsField = watch("tags");
  const _contentField = watch("content");
  const photoField = watch("thumbnail");

  const [contentField] = useDebounce(_contentField, 250);

  useEffect(() => {
    if (!saveFormToSession) return;
    handlePostFormUpdate(getValues());
  }, [contentField, titleField, tagsField, photoField]);

  async function handleAddTag(
    tag: string,
    cb?: (arg0: TItem[], tagId?: number) => void,
  ) {
    addNewTag(
      { tag },
      {
        onSuccess: (tagId) => {
          refetchTags().then(({ data }) => {
            cb?.(data as TItem[], tagId);
          });
        },
      },
    );
  }

  async function handleSubmitAndMaybeResetForm(formData: TPostSchema) {
    submitHandler(formData);
    if (resetAfterSubmission) {
      reset(initialValues);
    }
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleSubmitAndMaybeResetForm)}
    >
      <LabelWrapper label="Post title" className="text-lg text-violet-600">
        <Input {...register("title")} className="text-lg" />
      </LabelWrapper>
      <Controller
        control={control}
        name={"content"}
        render={({ field: { value } }) => {
          return (
            <MdEditor
              value={value}
              onChange={(value) => {
                setValue("content", value);
              }}
            ></MdEditor>
          );
        }}
      />

      <div>
        <Controller
          control={control}
          name={"thumbnail"}
          render={({ field: { value } }) => {
            console.log("rendering thumbnail", value);

            return (
              <PhotoInputField
                imageUrl={value}
                onPhotoChange={(href) => {
                  setValue("thumbnail", href);
                }}
              />
            );
          }}
        />
      </div>

      <div className="flex">
        <Controller
          control={control}
          name={"tags"}
          render={({ field: { value } }) => {
            return (
              <InputCombobox
                handleAddTag={handleAddTag}
                onSelectedItemsChange={(value) => {
                  setValue("tags", value);
                }}
                selectedItemValues={value}
                items={tagsOptions ?? []}
              />
            );
          }}
        ></Controller>
      </div>

      <Button className="self-start">Save</Button>
    </form>
  );
};

export { BlogPostForm };

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
import { useSession } from "next-auth/react";
import { type Session } from "next-auth";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";

const initialValues: TPostSchema = {
  content: "",
  tags: [999999, 999998],
  title: "Blog post №1",
};
interface BlogpostFormProps {
  defaultValues?: TPostSchema;
  //TODO: replace with api endpoint
  setEditorValue?: (arg0: string) => void;
}
const BlogPostForm = ({ defaultValues }: BlogpostFormProps) => {
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
    400,
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
  const [contentField] = useDebounce(_contentField, 250);

  useEffect(() => {
    handlePostFormUpdate(getValues());
  }, [contentField, titleField, tagsField]);

  async function handleAddTag(tag: string, cb?: (arg0: TItem[]) => void) {
    addNewTag(
      { tag },
      {
        onSuccess: () => {
          refetchTags().then(({ data }) => {
            cb?.(data as TItem[]);
          });
        },
      },
    );
  }

  return (
    <form className="flex flex-col gap-4">
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
                // @ts-expect-error: typings from drizzle
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

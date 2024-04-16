"use client";
import { type TPostSchema, postSchema } from "@/schemas/post";
import { Controller, useForm } from "react-hook-form";
import { Input, LabelWrapper } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEditor } from "@/components/mdEditor";
import { InputCombobox } from "./InputCombobox";
import { api } from "@/trpc/react";
import type { TItem } from "./InputCombobox";
const initialValues: TPostSchema = {
  content: "",
  tags: [999999, 999998],
  title: "Blog post №1",
};
interface BlogpostFormProps {
  defaultValues?: TPostSchema;
}
const BlogPostForm = ({ defaultValues }: BlogpostFormProps) => {
  defaultValues = defaultValues ?? initialValues;

  const { data: tagsOptions, refetch: refetchTags } =
    api.post.getAllTags.useQuery();
  const { mutate: addNewTag } = api.post.addTag.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm<TPostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

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
    <div className="flex max-w-[1440px] flex-col gap-4 p-4">
      <LabelWrapper label="Post title" className="text-lg text-violet-600">
        <Input {...register("title")} className="text-lg"></Input>
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
    </div>
  );
};

export { BlogPostForm };

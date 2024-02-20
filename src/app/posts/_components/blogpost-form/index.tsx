"use client";
import { type TPostSchema, postSchema } from "@/schemas/post";
import { Controller, useForm } from "react-hook-form";
import { Input, LabelWrapper } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEditor } from "@/components/mdEditor";
import { InputCombobox } from "@/components/ui/comboboxes/input-box";

const initialValues: TPostSchema = {
  content: "",
  tags: ["value1", "value2"],
  title: "Blog post №1",
};
interface BlogpostFormProps {
  defaultValues?: TPostSchema;
}
const BlogPostForm = ({ defaultValues }: BlogpostFormProps) => {
  defaultValues = defaultValues ?? initialValues;

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

  return (
    <div className="flex flex-col gap-4 bg-slate-50 p-4">
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
              onChange={(value) => setValue("content", value)}
            ></MdEditor>
          );
        }}
      ></Controller>
      <div>
        <h3 className="text-[20px] font-semibold">Add tags</h3>
        <Controller
          control={control}
          name={"tags"}
          render={({ field: { value } }) => {
            return (
              <InputCombobox
                onSelectedItemsChange={(value) => {
                  setValue("tags", value);
                }}
                selectedItems={value}
                items={[
                  { label: "Item1", value: "value1" },
                  { label: "Item2", value: "value2" },
                  { label: "Item3", value: "value3" },
                  { label: "Item4", value: "value4" },
                  { label: "Item5", value: "value5" },
                ]}
              />
            );
          }}
        ></Controller>
      </div>
    </div>
  );
};

export { BlogPostForm };

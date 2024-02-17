"use client";
import { type TPostSchema, postSchema } from "@/schemas/post";
import { Controller, useForm } from "react-hook-form";
import { Input, LabelWrapper } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEditor } from "@/components/mdEditor";
const initialValues: TPostSchema = {
  content: "",
  tags: [],
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
      </div>
    </div>
  );
};

export { BlogPostForm };

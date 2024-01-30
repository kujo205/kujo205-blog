"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useForm, type SubmitHandler } from "react-hook-form";
import { contactSchema, type TContactSchema } from "@/schemas/contact";
import { zodResolver } from "@hookform/resolvers/zod";
interface LabelWrapperProps {
  label: string;
  children: ReactNode;
  className?: string;
}

function LabelWrapper({ label, children, className }: LabelWrapperProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label className="font-semibold text-gray-700">{label}</label>
      {children}
    </div>
  );
}

const ContactMeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TContactSchema>({
    resolver: zodResolver(contactSchema),
  });
  const onSubmit: SubmitHandler<TContactSchema> = (data) => {};

  return (
    <form
      className="flex flex-col gap-4 rounded-xl bg-gradient-to-r from-[#9747FF] to-[#D74EB9] px-[40px] py-[32px] md:w-[800px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold text-white ">Or text directly</h1>
      <div className="flex gap-6">
        <LabelWrapper label={"Email"} className="min-w-[200px] flex-[0.5]">
          <Input
            type="text"
            placeholder="Email"
            className="w-full"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </LabelWrapper>

        <LabelWrapper label={"Name"} className="min-w-[200px] flex-[0.5]">
          <Input type="text" placeholder="Name" {...register("name")} />

          {errors.name && (
            <span className="text-red-600">{errors.name.message}</span>
          )}
        </LabelWrapper>
      </div>

      <LabelWrapper label={"Comment"}>
        <Textarea
          placeholder="Type your message here"
          {...register("message")}
        />

        {errors.message && (
          <span className="text-red-600">{errors.message.message}</span>
        )}
      </LabelWrapper>
      <Button className="self-end" type="submit">
        Submit
      </Button>
    </form>
  );
};

export { ContactMeForm };

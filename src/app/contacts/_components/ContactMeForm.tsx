import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface LabelWrapperProps {
  label: string;
  children: ReactNode;
  className?: string;
}
function LabelWrapper({ label, children, className }: LabelWrapperProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label className="text-gray-700">{label}</label>
      {children}
    </div>
  );
}

const ContactMeForm = () => {
  return (
    <form className="flex flex-col gap-4 rounded-xl bg-gradient-to-r from-[#9747FF] to-[#D74EB9] px-[40px] py-[32px] md:w-[800px]">
      <h1 className="text-2xl font-bold text-white ">Or text directly</h1>
      <div className="flex gap-6">
        <LabelWrapper label={"Email"} className="min-w-[200px] flex-[0.5]">
          <Input placeholder="Email" className="w-full" />
        </LabelWrapper>

        <LabelWrapper label={"Name"} className="min-w-[200px] flex-[0.5]">
          <Input placeholder="Name" />
        </LabelWrapper>
      </div>

      <LabelWrapper label={"Comment"}>
        <Textarea placeholder="Type your message here" />
      </LabelWrapper>
      <Button className="self-end" type="submit">
        Submit
      </Button>
    </form>
  );
};

export { ContactMeForm };

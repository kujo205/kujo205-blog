import { Icons } from "@/components/icons";

interface DeletableButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function DeletableButton({ children, onClick }: DeletableButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex gap-[8px] rounded-full border-[2px] border-violet-600 px-[8px] py-[4px] text-violet-600 hover:opacity-70"
    >
      {children}
      <Icons.Delete />
    </button>
  );
}

"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden bg-secondary",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="from- h-full w-full flex-1 bg-gradient-to-r from-[#4F3ABA] to-[#D94E68] transition-all"
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

const NavProgressBar = () => {
  const [value, setValue] = React.useState(0);
  //TODO: scroll bar is not working correctly

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      const documentHeight = document.body.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const startPoint = windowHeight / 2;
      const endPoint = documentHeight - windowHeight / 2;

      const scrolledInPercents = (scrollY / (endPoint - startPoint)) * 100;

      setValue(scrolledInPercents);
    });
  }, []);

  return <Progress value={value} />;
};

export { Progress, NavProgressBar };

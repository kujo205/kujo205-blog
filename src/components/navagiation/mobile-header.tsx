"use client";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { header } from "@/config/general";
import Link from "next/link";

export const OpenMobileHeaderButtonAndMobileHeader = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger
        className={buttonVariants({
          variant: "ghost",
          className: "block md:hidden",
        })}
      >
        <Icons.Menu />
      </SheetTrigger>
      <SheetContent>
        <nav className="flex flex-col gap-1">
          {header.map((navItem) => (
            <SheetClose asChild key={navItem.url}>
              <Link href={navItem.url}>
                <Button
                  variant={navItem.url === pathname ? "ghost-hovered" : "ghost"}
                  size="lg"
                  className="items-center"
                >
                  {navItem.name}
                </Button>
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

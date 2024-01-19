"use client";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
        <nav className="flex flex-col">
          {header.map((navItem) => (
            <Link href={navItem.url} key={navItem.url}>
              <Button
                variant={navItem.url === pathname ? "ghost-hovered" : "ghost"}
                size="lg"
                className="items-center"
              >
                {navItem.name}
              </Button>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

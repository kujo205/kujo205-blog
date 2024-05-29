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
import { getHeaderItems } from "@/config/general";
import Link from "next/link";
import { type UserRole } from "@/server/db/schema";

export const OpenMobileHeaderButtonAndMobileHeader = ({
  role,
}: {
  role?: UserRole | null;
}) => {
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
          {getHeaderItems(role).map((navItem) => (

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

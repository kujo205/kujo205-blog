"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
export default function Projects() {
  return (
    <section>
      <Button onClick={() => signIn("google")}>Sign in</Button>
    </section>
  );
}

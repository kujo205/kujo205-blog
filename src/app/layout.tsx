import "@/styles/globals.css";
import { Header } from "@/components/navagiation/header";
import { Footer } from "@/components/navagiation/footer";
import { Inter } from "next/font/google";
import { getServerAuthSession } from "@/server/auth";
import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Ivan's blog",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

//TODO: move to local postgress db and host on AWS

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} flex min-h-screen flex-col`}
      >
        <TRPCReactProvider>
          <Header session={session} />
          {children}
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}

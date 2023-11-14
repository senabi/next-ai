import "@/styles/globals.css";

import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";

export const metadata = {
  title: "Next AI",
  description: "Tools for building Next.js apps with AI",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
        >
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
          </TRPCReactProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

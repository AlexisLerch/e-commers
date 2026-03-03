"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./navbar/Navbar";

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
}

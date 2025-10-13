"use client";

// app/components/ClientLayout.tsx
import { SessionProvider } from "next-auth/react";
import TopNavigation from "./nav/TopNavigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionProvider>
        <TopNavigation />
        {children}
      </SessionProvider>
    </>
  );
}

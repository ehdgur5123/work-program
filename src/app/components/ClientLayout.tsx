// app/components/ClientLayout.tsx
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import TopNavigation from "./TopNavigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <TopNavigation />
      {children}
    </ClerkProvider>
  );
}

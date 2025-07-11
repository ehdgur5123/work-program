// app/components/ClientLayout.tsx

import TopNavigation from "./TopNavigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNavigation />
      {children}
    </>
  );
}

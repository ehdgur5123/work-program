import React from "react";

export default function SymbolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="text-6xl md:text-6xl text-center p-3 m-2 md:p-5 md:m-20">
        기호찾기
      </div>
      <div>{children}</div>
      <div className="h-20"></div>
    </>
  );
}

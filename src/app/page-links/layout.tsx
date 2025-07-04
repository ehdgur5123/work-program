import React from "react";

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="text-7xl text-center p-5 mb-3">인터넷 링크</h1>
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col gap-3 max-w-[600px] min-w-[500px]">
          {children}
        </div>
      </div>
    </>
  );
}

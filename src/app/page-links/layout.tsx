import React from "react";

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="my-10 mx-auto md:text-7xl text-5xl text-center">
        인터넷 링크
      </h1>
      <div className="p-5 min-h-[1000px] max-w-4xl mx-auto w-full">
        {children}
      </div>
    </>
  );
}

import Link from "next/link";
import React from "react";

const URL = "/project/page-links";

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="my-10 mx-auto md:text-7xl text-5xl text-center">
        <Link href={URL}>인터넷 링크</Link>
      </h1>
      <div className="p-5 min-h-[1000px] max-w-4xl mx-auto w-full">
        {children}
      </div>
    </>
  );
}

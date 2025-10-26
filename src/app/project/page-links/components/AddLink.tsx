"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/app/components/Loading";

const URL = "/project/page-links/add-link";

export default function AddLink() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="h-20 flex items-center justify-center hover:bg-gray-600 rounded-2xl active:scale-90 cursor-pointer"
      onClick={() => startTransition(() => router.push(URL))}
    >
      <PlusCircleIcon className="size-12" />
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <LoadingSpinner />
        </div>
      )}
    </button>
  );
}

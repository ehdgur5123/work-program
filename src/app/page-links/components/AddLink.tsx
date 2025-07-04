import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function AddLink() {
  return (
    <Link
      href="page-links/add-link"
      className="flex items-center justify-center hover:bg-gray-600 rounded-2xl active:scale-90"
    >
      <PlusCircleIcon className="size-12" />
    </Link>
  );
}

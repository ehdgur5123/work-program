import { ArrowPathIcon } from "@heroicons/react/24/solid";

interface ResetSearchProps {
  handleSearch: () => void;
}
export default function ResetSearch({ handleSearch }: ResetSearchProps) {
  return (
    <button
      className="cursor-pointer rounded-lg w-6 hover:text-gray-500 active:scale-80"
      onClick={handleSearch}
    >
      <ArrowPathIcon className="size-7" />
    </button>
  );
}

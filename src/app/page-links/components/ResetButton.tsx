import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";

interface ResetButtonProps {
  handleReset: () => void;
}

export default function ResetButton({ handleReset }: ResetButtonProps) {
  return (
    <button onClick={handleReset}>
      <ArrowPathRoundedSquareIcon className="size-8 hover:text-gray-500 active:scale-90 cursor-pointer" />
    </button>
  );
}

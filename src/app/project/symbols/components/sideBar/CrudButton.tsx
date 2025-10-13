import clsx from "clsx";

interface ButtonInBarProps {
  text: string;
  handleClick: () => void;
  disabled?: boolean;
  color?: "red" | "blue" | "gray";
}

export default function CrudButton({
  text,
  handleClick,
  disabled,
  color = "gray",
}: ButtonInBarProps) {
  const btnClass = clsx(
    "p-2 rounded-2xl w-full mx-auto cursor-pointer active:scale-95",
    color === "red" && "bg-red-600 hover:bg-red-400",
    color === "blue" && "bg-blue-600 hover:bg-blue-400",
    color === "gray" && "bg-gray-600 hover:bg-gray-400"
  );
  return (
    <button
      type="button"
      className={btnClass}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

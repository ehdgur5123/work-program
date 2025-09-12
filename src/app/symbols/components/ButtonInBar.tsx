interface ButtonInBarProps {
  text: string;
  hadleClick: () => void;
}

export default function ButtonInBar({ text, hadleClick }: ButtonInBarProps) {
  return (
    <button
      type="button"
      className="p-2 border-2 rounded-2xl w-1/4 cursor-pointer hover:bg-gray-400 active:scale-95"
      onClick={hadleClick}
    >
      {text}
    </button>
  );
}

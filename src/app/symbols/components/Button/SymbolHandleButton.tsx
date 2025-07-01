import { ReactNode } from "react";

interface SymbolHandleButton {
  handleClick: () => void;
  children: ReactNode;
  mobile?: boolean;
  title?: string;
}

export default function SymbolHandleButton({
  handleClick,
  children,
  mobile = false,
  title = "",
}: SymbolHandleButton) {
  return (
    <>
      {mobile ? (
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center border border-gray-400 hover:text-gray-500 active:scale-80 rounded-full"
          onClick={handleClick}
          title={title}
        >
          {children}
        </button>
      ) : (
        <button
          className="text-sm p-1 border-1 cursor-pointer hover:text-blue-100 active:scale-90"
          onClick={handleClick}
        >
          {children}
        </button>
      )}
    </>
  );
}

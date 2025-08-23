"use client";

import { forwardRef } from "react";
import useIsMobile from "@/app/hooks/useIsMobile";
import { XMarkIcon } from "@heroicons/react/24/solid";
interface ContextMenuProps {
  x: number;
  y: number;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete: () => void;
  setContextMenu: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >;
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ x, y, onEdit, onDelete, setContextMenu }, ref) => {
    const isMobile = useIsMobile();
    return (
      <div
        ref={ref}
        style={isMobile ? undefined : { top: y, left: x }}
        className={`${
          isMobile ? "fixed bottom-0 left-0 w-full" : "absolute"
        } bg-white border rounded-xl shadow-lg p-2 z-50 text-black text-center w-2xs`}
      >
        {isMobile ? (
          <div className="text-end pr-2">
            <button onClick={() => setContextMenu(null)}>
              <XMarkIcon className="size-6" />
            </button>
          </div>
        ) : null}
        <div className="flex flex-col gap-1">
          <button
            onClick={onEdit}
            className="hover:bg-gray-500 p-2 rounded-lg border cursor-pointer active:scale-95"
          >
            수정
          </button>
          <button
            onClick={onDelete}
            className="hover:bg-gray-500 p-2 rounded-lg border cursor-pointer active:scale-95"
          >
            삭제
          </button>
        </div>
      </div>
    );
  }
);

// 디버깅에 유용
ContextMenu.displayName = "ContextMenu";

export default ContextMenu;

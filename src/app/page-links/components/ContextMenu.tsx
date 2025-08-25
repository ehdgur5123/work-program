"use client";

import { forwardRef } from "react";
import useIsMobile from "@/app/hooks/useIsMobile";
import { XMarkIcon } from "@heroicons/react/24/solid";
interface ContextMenuProps {
  x: number;
  y: number;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete: () => void;
  onConnection: () => void;
  setContextMenu: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >;
  title: string;
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ x, y, onEdit, onDelete, onConnection, setContextMenu, title }, ref) => {
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
          <div className="flex pr-2 relative mb-1">
            <div className="flex-1">{title}</div>
            <button
              className="absolute right-0"
              onClick={() => setContextMenu(null)}
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>
        ) : null}
        <div className="flex flex-col gap-1">
          {isMobile ? (
            <button
              onClick={onConnection}
              className="hover:bg-gray-500 p-2 rounded-lg border cursor-pointer active:scale-95"
            >
              접속
            </button>
          ) : null}
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

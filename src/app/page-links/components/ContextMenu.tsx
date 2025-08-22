"use client";

import { forwardRef } from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete: () => void;
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ x, y, onEdit, onDelete }, ref) => {
    return (
      <div
        ref={ref}
        style={{ top: y, left: x }}
        className="w-2xs absolute bg-white border rounded-xl shadow-lg p-2 z-50 text-black text-center"
      >
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

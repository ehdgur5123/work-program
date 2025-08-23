"use client";
import Link from "next/link";
import { LinkItem } from "@/app/page-links/types";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ContextMenu from "@/app/page-links/components/ContextMenu";
import CorrectionEdit from "@/app/page-links/components/CorrectionEdit";
import useLinks from "../hooks/useLinks";
import useDeleteLink from "../hooks/useDeleteLink";
interface LinkListProps {
  linkData: LinkItem;
}

export default function LinkList({ linkData }: LinkListProps) {
  const [imageError, setImageError] = useState(false);
  const [isCorrection, setIsCorrection] = useState(false);
  const { resetFilters } = useLinks();
  const { mutate: deleteToURL } = useDeleteLink();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [editPosition, setEditPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // 클릭 바깥에서 메뉴 닫기
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedInsideDropdown =
        dropdownRef.current?.contains(target) ?? false;
      const clickedInsideContextMenu =
        contextMenuRef.current?.contains(target) ?? false;

      if (!clickedInsideDropdown && !clickedInsideContextMenu) {
        setContextMenu(null); // 바깥쪽 클릭 → 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY });
  };

  const handleEdit = () => {
    setContextMenu(null);
    setEditPosition(contextMenu); // 버튼 오른쪽 살짝 옆
    setIsCorrection(true);
  };

  const handleDelete = async (_id: string) => {
    console.log("Delete", _id);
    setContextMenu(null); // 메뉴 닫기

    deleteToURL(_id);

    resetFilters();
  };

  const handleIsCorrection = () => {
    setIsCorrection(false);
  };

  return (
    <>
      <Link
        href={linkData.url}
        target="_blank"
        rel="noopener noreferrer"
        onContextMenu={handleContextMenu}
        className="flex items-center gap-2 border-2 rounded-2xl p-2 w-full hover:bg-gray-500 active:scale-90"
      >
        <div className="p-2 h-20 w-20 bg-white rounded-2xl flex justify-center items-center">
          {imageError || !linkData.logo ? (
            <EyeSlashIcon className="size-8 text-black" />
          ) : (
            <img
              src={linkData.logo}
              alt={linkData.title}
              className="h-[70px] w-[70px] object-cover rounded-md"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center mx-auto">
          <div className="w-full text-center overflow-hidden line-clamp-1 text-2xl">
            {linkData.title}
          </div>
          <div className="w-full text-center overflow-hidden line-clamp-1 text-sm">
            {linkData.category.large} | {linkData.category.medium} |{" "}
            {linkData.category.small}
          </div>
        </div>
      </Link>

      {/* ContextMenu를 body에 포탈로 렌더링 */}
      {contextMenu &&
        createPortal(
          <ContextMenu
            ref={contextMenuRef}
            x={contextMenu.x}
            y={contextMenu.y}
            onEdit={() => handleEdit()}
            onDelete={() => handleDelete(linkData._id)}
          />,
          document.body
        )}

      {isCorrection && editPosition && (
        <CorrectionEdit
          handleIsCorrection={handleIsCorrection}
          linkData={linkData}
          x={editPosition.x}
          y={editPosition.y}
        />
      )}
    </>
  );
}

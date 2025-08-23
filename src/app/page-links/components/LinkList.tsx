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
import useIsMobile from "@/app/hooks/useIsMobile";

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

  const dropdownRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const correctionRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = useIsMobile();

  // 클릭/터치 바깥에서 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      const clickedInsideDropdown =
        dropdownRef.current?.contains(target) ?? false;
      const clickedInsideContextMenu =
        contextMenuRef.current?.contains(target) ?? false;
      const clickedInsideCorrection =
        correctionRef.current?.contains(target) ?? false;

      if (
        !clickedInsideDropdown &&
        !clickedInsideContextMenu &&
        !clickedInsideCorrection
      ) {
        setContextMenu(null);
        handleIsCorrection();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // 데스크톱 → 오른쪽 클릭
  const handleContextMenu = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.preventDefault();
    setContextMenu(null); // 이전 메뉴 닫기
    setContextMenu({ x: e.pageX, y: e.pageY });
  };

  const handleEdit = () => {
    setContextMenu(null);
    setEditPosition(contextMenu);
    setIsCorrection(true);
  };

  const handleDelete = async (_id: string) => {
    setContextMenu(null);
    deleteToURL(_id);
    resetFilters();
  };

  const handleIsCorrection = () => {
    setIsCorrection(false);
  };

  return (
    <>
      <Link
        href="#" // 직접 링크 이동 방지
        onClick={() => window.open(linkData.url, "_blank")} // 새 창 열기
        target="_blank"
        rel="noopener noreferrer"
        onContextMenu={(e) => {
          if (isMobile) e.preventDefault();
          else handleContextMenu(e);
        }}
        onTouchStart={(e) => {
          if (!isMobile) return;
          e.preventDefault(); // 모바일 기본 메뉴 차단
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setContextMenu({ x: 0, y: 0 }); // 모바일은 위치 무시, 아래쪽 표시
          }, 600);
        }}
        onTouchEnd={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }}
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

      {contextMenu &&
        createPortal(
          <ContextMenu
            ref={contextMenuRef}
            x={contextMenu.x}
            y={contextMenu.y}
            onEdit={handleEdit}
            setContextMenu={setContextMenu}
            onDelete={() => handleDelete(linkData._id)}
          />,
          document.body
        )}

      {isCorrection && editPosition && (
        <CorrectionEdit
          correctionRef={correctionRef}
          handleIsCorrection={handleIsCorrection}
          linkData={linkData}
          x={editPosition.x}
          y={editPosition.y}
        />
      )}
    </>
  );
}

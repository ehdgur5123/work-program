"use client";

import Link from "next/link";
import { LinkItem } from "@/app/project/page-links/types";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ContextMenu from "@/app/project/page-links/components/ContextMenu";
import CorrectionEdit from "@/app/project/page-links/components/CorrectionEdit";
import useLinks from "../hooks/useLinks";
import useDeleteLink from "../hooks/useDeleteLink";
import useIsMobile from "@/app/hooks/useIsMobile";
import HoverTooltip from "./HoverTooltip";

interface LinkListProps {
  linkData: LinkItem;
}

interface PositionType {
  x: number;
  y: number;
}
export default function LinkList({ linkData }: LinkListProps) {
  const [imageError, setImageError] = useState(false);
  const { resetFilters } = useLinks();
  const { mutate: deleteToURL } = useDeleteLink();

  const [contextMenuPosition, setContextMenuPosition] =
    useState<PositionType | null>(null);
  const [editPosition, setEditPosition] = useState<PositionType | null>(null);
  const [contentPosition, setContentPosition] = useState<PositionType | null>(
    null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const correctionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
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
      const clickedInsideContent =
        contentRef.current?.contains(target) ?? false;
      if (
        !clickedInsideDropdown &&
        !clickedInsideContextMenu &&
        !clickedInsideCorrection &&
        !clickedInsideContent
      ) {
        setContextMenuPosition(null);
        setEditPosition(null);
        setContentPosition(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.preventDefault();
    setContextMenuPosition(null); // 이전 메뉴 닫기
    setContextMenuPosition({ x: e.pageX, y: e.pageY });
  };

  const handleEdit = () => {
    setContextMenuPosition(null);
    setEditPosition(contextMenuPosition);
  };

  const handleDelete = async (_id: string) => {
    setContextMenuPosition(null);
    deleteToURL(_id);
    resetFilters();
  };

  const onConnection = () => {
    window.open(linkData.url, "_blank");
  };

  const handleMouseEnter: React.MouseEventHandler<HTMLAnchorElement> = () => {
    if (isMobile) return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setContentPosition(lastMousePosRef.current);
    }, 800);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) return;
    // 항상 최신 커서 좌표 저장
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setContentPosition(null);
  };

  // 언마운트 시 타이머 정리 (메모리 누수 방지)
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);
  return (
    <>
      <Link
        href="#" // 직접 링크 이동 방지
        onClick={(e) => {
          e.preventDefault();
          if (!isMobile) {
            onConnection();
          } else {
            setContextMenuPosition({ x: 0, y: 0 });
          }
        }}
        target="_blank"
        rel="noopener noreferrer"
        onContextMenu={handleContextMenu}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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

      {contextMenuPosition &&
        createPortal(
          <ContextMenu
            ref={contextMenuRef}
            x={contextMenuPosition.x}
            y={contextMenuPosition.y}
            onEdit={handleEdit}
            setContextMenu={setContextMenuPosition}
            onConnection={onConnection}
            title={linkData.title}
            onDelete={() => handleDelete(linkData._id)}
          />,
          document.body
        )}

      {editPosition &&
        createPortal(
          <CorrectionEdit
            correctionRef={correctionRef}
            handleIsCorrection={() => setEditPosition(null)}
            linkData={linkData}
            x={editPosition.x}
            y={editPosition.y}
          />,
          document.body
        )}

      {contentPosition &&
        createPortal(
          <HoverTooltip
            contentRef={contentRef}
            x={contentPosition.x}
            y={contentPosition.y}
            content={linkData.content}
          />,
          document.body
        )}
    </>
  );
}

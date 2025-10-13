"use client";

import { useState } from "react";

export default function useLinkList(
  deleteToURL: (id: string) => void,
  resetFilters: () => void
) {
  const [imageError, setImageError] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [editPosition, setEditPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isCorrection, setIsCorrection] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY });
  };

  const handleEdit = () => {
    if (!contextMenu) return;
    setContextMenu(null);
    setEditPosition(contextMenu);
    setIsCorrection(true);
  };

  const handleDelete = (_id: string) => {
    setContextMenu(null);
    deleteToURL(_id);
    resetFilters();
  };

  return {
    imageError,
    setImageError,
    contextMenu,
    setContextMenu,
    editPosition,
    isCorrection,
    setIsCorrection,
    handleContextMenu,
    handleEdit,
    handleDelete,
  };
}

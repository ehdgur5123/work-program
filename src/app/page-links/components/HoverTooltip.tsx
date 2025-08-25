"use client";

interface HoverTooltipProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  x: number;
  y: number;
  content: string;
}
export default function HoverTooltip({
  contentRef,
  x,
  y,
  content,
}: HoverTooltipProps) {
  return (
    <div
      ref={contentRef}
      style={{
        position: "fixed",
        top: y,
        left: x,
        transform: "translate(12px, -12px)",
      }}
      className="bg-black text-white text-2xl p-2 rounded-md shadow-md"
    >
      {content.length === 0 ? "설명이 없습니다." : content}
    </div>
  );
}

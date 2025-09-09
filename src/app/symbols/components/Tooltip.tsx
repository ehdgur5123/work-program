interface CopyTooltip {
  tooltipPosition: { x: number; y: number };
  text: string;
}

export default function CopyTooltip({ tooltipPosition, text }: CopyTooltip) {
  return (
    <div
      style={{
        position: "fixed",
        left: tooltipPosition.x + 10,
        top: tooltipPosition.y - 20,
        background: "black",
        color: "white",
        padding: "6px 12px",
        borderRadius: "8px",
        fontSize: "14px",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {text}
    </div>
  );
}

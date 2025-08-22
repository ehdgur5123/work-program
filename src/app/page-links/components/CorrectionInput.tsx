"use client";

import { useState } from "react";

interface CorrectionInputProps {
  label: string;
  originData: string;
  handleCorrectionData: (data: {
    label: string;
    correctionData: string;
  }) => void;
}

export default function CorrectionInput({
  label,
  originData,
  handleCorrectionData,
}: CorrectionInputProps) {
  const [value, setValue] = useState(originData);

  return (
    <div className="flex gap-2">
      <label htmlFor={label} className="w-20 text-center text-xl">
        {label}
      </label>
      <input
        type="text"
        id={label}
        className="bg-white flex-1 text-black p-1 pl-2"
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
          handleCorrectionData({ label, correctionData: newValue });
        }}
      />
    </div>
  );
}

"use client";

import CorrectionInput from "./CorrectionInput";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { LinkItem } from "@/app/project/page-links/types";
import { useState } from "react";
import useUpdateLink from "@/app/project/page-links/hooks/useUpdateLink";
import useIsMobile from "@/app/hooks/useIsMobile";

interface CorrectionEditProps {
  x: number;
  y: number;
  handleIsCorrection: () => void;
  linkData: LinkItem;
  correctionRef: React.RefObject<HTMLDivElement | null>;
}

export default function CorrectionEdit({
  handleIsCorrection,
  linkData,
  x,
  y,
  correctionRef,
}: CorrectionEditProps) {
  const [correctionData, setCorrectionData] = useState<LinkItem>(linkData);
  const { mutate: patchToURL } = useUpdateLink();
  const isMobile = useIsMobile();
  const submitCorrection = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      patchToURL(correctionData);
    } catch {
      console.log("수정에 실패 하였습니다.");
    } finally {
      handleIsCorrection();
    }
  };

  const handleCorrectionData = (data: {
    label: string;
    correctionData: string;
  }) => {
    const { label, correctionData: value } = data;

    setCorrectionData((prev) => {
      if (label === "title") return { ...prev, title: value };
      if (label === "content") return { ...prev, content: value };
      if (label === "large")
        return { ...prev, category: { ...prev.category, large: value } };
      if (label === "medium")
        return { ...prev, category: { ...prev.category, medium: value } };
      if (label === "small")
        return { ...prev, category: { ...prev.category, small: value } };
      return prev;
    });
  };

  return (
    <div
      ref={correctionRef}
      className={`border-2 shadow-lg z-50 p-2 rounded-sm bg-black ${
        isMobile ? "fixed bottom-0 left-0 w-full" : "absolute"
      }`}
      style={isMobile ? undefined : { top: y, left: x }}
    >
      <div className="flex items-center justify-end cursor-pointer hover:text-gray-400 active:text-gray-500">
        <button type="button" onClick={handleIsCorrection}>
          <XMarkIcon className="size-8" />
        </button>
      </div>
      <form
        onSubmit={submitCorrection}
        className="flex flex-col gap-3 px-6 py-3"
      >
        <CorrectionInput
          label="title"
          originData={linkData.title}
          handleCorrectionData={handleCorrectionData}
        />
        <CorrectionInput
          label="content"
          originData={linkData.content}
          handleCorrectionData={handleCorrectionData}
        />
        <CorrectionInput
          label="large"
          originData={linkData.category.large}
          handleCorrectionData={handleCorrectionData}
        />
        <CorrectionInput
          label="medium"
          originData={linkData.category.medium}
          handleCorrectionData={handleCorrectionData}
        />
        <CorrectionInput
          label="small"
          originData={linkData.category.small}
          handleCorrectionData={handleCorrectionData}
        />
        <button
          type="submit"
          className="border p-1 rounded-sm text-2xl cursor-pointer hover:bg-gray-400 active:scale-95"
        >
          확인
        </button>
      </form>
    </div>
  );
}

"use client";

import CorrectionInput from "./CorrectionInput";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { LinkItem } from "@/app/page-links/types";
import { useState } from "react";
import { patchToURL } from "@/app/page-links/controllers/axiosLink";

type Data = {
  title?: string;
  content?: string;
  category?: { large?: string; medium?: string; small?: string };
};

interface CorrectionEditProps {
  x: number;
  y: number;
  handleIsCorrection: () => void;
  linkData: LinkItem;
}

export default function CorrectionEdit({
  handleIsCorrection,
  linkData,
  x,
  y,
}: CorrectionEditProps) {
  const initData = {
    title: linkData.title,
    content: linkData.content,
    category: {
      large: linkData.category.large,
      medium: linkData.category.medium,
      small: linkData.category.small,
    },
  };
  const [correctionData, setCorrectionData] = useState<Data>(initData);

  const submitCorrection = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await patchToURL(linkData._id, correctionData);
      console.log("수정이 완료 되었습니다.", res);
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
      className="border-2 absolute shadow-lg z-50 p-2 rounded-sm bg-black"
      style={{ top: y, left: x }}
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

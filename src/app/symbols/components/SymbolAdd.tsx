import { useState } from "react";
import { fetchAddSymbol } from "../controllers/fetchSymbols";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { SymbolItem } from "../types";

interface SymbolAddProps {
  onNewSymbolChange: (symbol: SymbolItem) => void;
}

export default function SymbolAdd({ onNewSymbolChange }: SymbolAddProps) {
  const RESET = {
    symbol: "",
    unicode: "",
    html: "",
    altCode: "",
    tags: ["", "", "", "", ""],
  };

  const [formData, setFormData] = useState(RESET);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { id, value } = e.target;

    if (id.startsWith("add_tag")) {
      const newTags = [...formData.tags];
      if (index !== undefined) newTags[index] = value;
      setFormData((prev) => ({ ...prev, tags: newTags }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const symbolSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.symbol.trim().length === 0) {
      alert("기호는 필수값입니다.");
      return;
    }

    if (formData.symbol.trim().length >= 2) {
      alert("기호 하나만 입력하세요");
      return;
    }

    const response = await fetchAddSymbol({
      symbol: formData.symbol,
      unicode: formData.unicode || "None",
      html: formData.html || "None",
      name: formData.tags || [],
      code: formData.altCode || "None",
    });
    if (response === "EXISTS") {
      alert("이미 존재하는 기호입니다.");
    } else if (response) {
      alert("✅ 기호가 성공적으로 추가되었습니다.");
      onNewSymbolChange(response);
      setFormData((prev) => ({
        ...prev,
        symbol: "",
        unicode: "",
        html: "",
        altCode: "",
      }));
    } else {
      alert("기호 추가 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <form
        className="border border-gray-300 rounded-xl shadow-sm p-4 max-w-150"
        onSubmit={symbolSubmit}
      >
        {/* 삭제 버튼 */}
        <div className="flex items-center justify-end">
          <div
            onClick={() => setFormData(RESET)}
            className="hover:text-gray-500 rounded-full text-3xl mr-2 active:scale-80"
          >
            <ArrowPathIcon className="size-5 mb-3" />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col justify-between gap-2">
            {/* 기호 */}
            <div className="flex gap-2 text-sm items-center">
              <label
                htmlFor="symbol"
                className="font-semibold text-gray-600 w-20"
              >
                기호
              </label>
              <input
                type="text"
                id="symbol"
                value={formData.symbol}
                onChange={handleChange}
                placeholder="기호(필수)"
                className="bg-white text-black border px-2 py-1 rounded text-xs"
              />
            </div>
            {/* 유니코드 */}
            <div className="flex gap-2 text-sm items-center">
              <label
                htmlFor="unicode"
                className="font-semibold text-gray-600 w-20"
              >
                유니코드
              </label>
              <input
                type="text"
                id="unicode"
                value={formData.unicode}
                onChange={handleChange}
                placeholder="유니코드"
                className="bg-white text-black border px-2 py-1 rounded text-xs"
              />
            </div>
            {/* HTML */}
            <div className="flex gap-2 text-sm items-center">
              <label
                htmlFor="html"
                className="font-semibold text-gray-600 w-20"
              >
                HTML
              </label>
              <input
                type="text"
                id="html"
                value={formData.html}
                onChange={handleChange}
                placeholder="HTML"
                className="bg-white text-black border px-2 py-1 rounded text-xs"
              />
            </div>
            {/* Alt Code */}
            <div className="flex gap-2 text-sm items-center">
              <label
                htmlFor="altCode"
                className="font-semibold text-gray-600 w-20"
              >
                Alt Code
              </label>
              <input
                type="text"
                id="altCode"
                value={formData.altCode}
                onChange={handleChange}
                placeholder="Alt Code"
                className="bg-white text-black border px-2 py-1 rounded text-xs"
              />
            </div>
          </div>
        </div>
        {/* 태그 영역 */}
        <label
          htmlFor="add_tag_0"
          className="text-sm font-semibold text-gray-600 flex items-center justify-start mt-2"
        >
          태그
        </label>
        <div className="flex flex-row gap-2">
          {formData.tags.map((tag, index) => (
            <input
              key={index}
              id={`add_tag_${index}`}
              value={tag}
              onChange={(e) => handleChange(e, index)}
              className="bg-white text-black border px-2 py-1 rounded text-xs mb-1 w-full h-7"
            />
          ))}
        </div>

        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm cursor-pointer hover:bg-blue-400 active:bg-blue-200 w-full mt-2"
        >
          확인
        </button>
      </form>
    </>
  );
}

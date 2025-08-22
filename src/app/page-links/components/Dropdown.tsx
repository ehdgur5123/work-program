"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface DropdownProps {
  data: string[];
  selectedValue?: string;
  setSelectedValue?: (value: string) => void;
  handleValue?: (item: string) => void;
}

export default function Dropdown({
  data,
  selectedValue,
  setSelectedValue,
  handleValue,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item: string) => {
    setSelectedValue?.(item); // 버튼 텍스트 업데이트
    setSelectedValue?.(item); // 부모로 선택값 전달
    setIsOpen(false); // 목록 닫기
  };

  return (
    <div ref={dropdownRef} className="relative flex-1">
      {/* 버튼 */}
      <button
        type="button"
        className="border-2 w-full flex px-2 py-2 items-center justify-center rounded-sm cursor-pointer active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">{selectedValue ? selectedValue : "선택"}</div>{" "}
        <ChevronDownIcon className="w-5 h-5" />
      </button>

      {/* 드롭다운 목록 */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
          {data.length !== 0 ? (
            data.map((item) => (
              <li
                key={item}
                className="px-3 py-2 cursor-pointer hover:bg-gray-400 text-black"
                onClick={() => {
                  handleSelect(item);
                  handleValue?.(item);
                }}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="text-black px-3 py-2">데이터가 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  );
}

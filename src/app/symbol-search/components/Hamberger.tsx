"use client";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { hambergerToggleListType } from "@/app/symbol-search/types";
interface HambergerProps {
  hambergerToggleList: hambergerToggleListType;
  setHambergerToggleList: React.Dispatch<hambergerToggleListType>;
  isMobile: boolean;
}
export default function Hamberger({
  hambergerToggleList,
  setHambergerToggleList,
  isMobile,
}: HambergerProps) {
  const [barToggle, setBarToggle] = useState(false);

  return (
    <>
      {!barToggle ? (
        <button
          onClick={() => setBarToggle(!barToggle)}
          className="p-2 rounded-full fixed top-25 left-5 bg-gray-400 text-black hover:scale-110 active:scale-90 z-10"
        >
          <Bars4Icon className="size-7" />
        </button>
      ) : (
        <div className="fixed top-20 w-72 h-full bg-black flex flex-col">
          <button
            onClick={() => setBarToggle(false)}
            className="absolute top-5 right-4 p-2 hover:text-gray-400 active:scale-90"
          >
            <XMarkIcon className="size-8" />
          </button>
          <div className="flex flex-col p-5 mt-24 text-2xl gap-4 items-center">
            <button
              onClick={() => {
                setHambergerToggleList({
                  symbolAddToggle: !hambergerToggleList.symbolAddToggle,
                  symbolUpdateToggle: false,
                  symbolDeleteToggle: false,
                });
                if (isMobile) setBarToggle(false);
              }}
              className={`p-2 w-full text-center hover:bg-gray-400 rounded-2xl active:scale-90 ${
                hambergerToggleList.symbolAddToggle ? "bg-gray-500" : ""
              }`}
            >
              기호 추가
            </button>
            <button
              onClick={() => {
                setHambergerToggleList({
                  symbolAddToggle: false,
                  symbolUpdateToggle: !hambergerToggleList.symbolUpdateToggle,
                  symbolDeleteToggle: false,
                });
                if (isMobile) setBarToggle(false);
              }}
              className={`p-2 w-full text-center hover:bg-gray-400 rounded-2xl active:scale-90 ${
                hambergerToggleList.symbolUpdateToggle ? "bg-gray-500" : ""
              }`}
            >
              기호 수정
            </button>
            <button
              onClick={() => {
                setHambergerToggleList({
                  symbolAddToggle: false,
                  symbolUpdateToggle: false,
                  symbolDeleteToggle: !hambergerToggleList.symbolDeleteToggle,
                });
                if (isMobile) setBarToggle(false);
              }}
              className={`p-2 w-full text-center hover:bg-gray-400 rounded-2xl active:scale-90 ${
                hambergerToggleList.symbolDeleteToggle ? "bg-gray-500" : ""
              }`}
            >
              기호 삭제
            </button>
          </div>
        </div>
      )}
    </>
  );
}

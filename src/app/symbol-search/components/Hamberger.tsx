"use client";
import { Bars4Icon, DivideIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import SymbolAddPage from "./SymbolAddPage";

export default function Hamberger() {
  const [barToggle, setBarToggle] = useState(false);
  const [symbolAddToggle, setSymbolAddToggle] = useState(false);
  const [symbolDelToggle, setSymbolDelToggle] = useState(false);

  return (
    <>
      <button
        onClick={() => setBarToggle(!barToggle)}
        className="p-2 rounded-full fixed top-25 left-5 bg-gray-400 text-black hover:scale-110 active:scale-90 z-10"
      >
        <Bars4Icon className="size-7" />
      </button>
      {barToggle ? (
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
                setSymbolAddToggle(!symbolAddToggle);
                setSymbolDelToggle(false);
              }}
              className=" p-2 w-full text-center hover:bg-gray-400 rounded-2xl active:scale-90"
            >
              기호 추가
            </button>
            <button
              onClick={() => {
                setSymbolDelToggle(!symbolDelToggle);
                setSymbolAddToggle(false);
              }}
              className=" p-2 w-full text-center hover:bg-gray-400 rounded-2xl active:scale-90"
            >
              기호 수정·삭제
            </button>
          </div>
        </div>
      ) : null}
      {symbolAddToggle ? <SymbolAddPage /> : null}
      {symbolDelToggle ? <div className="w-[700px] bg-red-300"></div> : null}
    </>
  );
}

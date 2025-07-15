"use client";

import { SymbolItem } from "@/app/symbol-search/types";
import { useEffect, useState } from "react";
import InputData from "./InputData";

interface SymbolUpdatePageProps {
  selectedSymbol: SymbolItem | null;
}

export default function SymbolUpdatePage({
  selectedSymbol,
}: SymbolUpdatePageProps) {
  const symbolInitialValue = {
    _id: selectedSymbol?._id,
    symbol: selectedSymbol?.symbol,
    unicode: selectedSymbol?.unicode,
    html: selectedSymbol?.html,
    name: selectedSymbol?.name,
    code: selectedSymbol?.code,
  };

  const [symbolToModify, setSymbolToModify] = useState(symbolInitialValue);

  useEffect(() => {
    setSymbolToModify(symbolInitialValue);
  }, [selectedSymbol]);

  return (
    <div className="md:w-[800px] bg-red-300">
      {!selectedSymbol ? (
        <div className="sticky top-1/2 text-center text-3xl p-3">
          수정할 기호를 클릭해주세요.
        </div>
      ) : (
        <form className="sticky top-1/2 text-center  p-3 border-2">
          <div className="flex gap-5">
            <div className="flex items-center justify-center border-2 w-24 h-24 rounded-2xl">
              <div className="text-4xl ">{symbolToModify.symbol}</div>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <InputData
                label="유니코드"
                id="unicode"
                placeholder=""
                value={symbolToModify.unicode || ""}
                handleChange={(e) =>
                  setSymbolToModify({
                    ...symbolToModify,
                    unicode: e.target.value,
                  })
                }
              />
              <InputData
                label="html"
                id="html"
                placeholder=""
                value={symbolToModify.html || ""}
                handleChange={(e) =>
                  setSymbolToModify({
                    ...symbolToModify,
                    html: e.target.value,
                  })
                }
              />
              <InputData
                label="Alt Code"
                id="code"
                placeholder=""
                value={symbolToModify.code || ""}
                handleChange={(e) =>
                  setSymbolToModify({
                    ...symbolToModify,
                    code: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex flex-col items-start text-lg">
            <div className="font-semibold text-white text-lg">Tag Name</div>
            <div className="flex flex-wrap gap-4 p-3 border-2 w-full min-h-40 overflow-auto items-start">
              {symbolToModify.name?.map((item) => (
                <div key={item} className="border-2 p-2">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

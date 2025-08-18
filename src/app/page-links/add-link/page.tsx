"use client";

import InputForm from "../components/InputForm";
import useCategory from "../hooks/useCategory";
import { useState, useEffect } from "react";
// import useUrlValidation from "../hooks/validation/useUrlValidation";

const INITQUERYVALUE = {
  URL: "",
  large: "",
  medium: "",
  small: "",
};

export default function AddLinkPage() {
  const {
    largeList,
    mediumList,
    smallList,
    setSelectedLarge,
    setSelectedMedium,
    setSelectedSmall,
    selectedLarge,
    selectedMedium,
    selectedSmall,
  } = useCategory();

  const [queryValue, setQueryValue] = useState(INITQUERYVALUE);

  const submitUrl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueryValue(INITQUERYVALUE);
  };

  useEffect(() => {
    setSelectedMedium("");
    setSelectedSmall("");
  }, [queryValue.large]);

  useEffect(() => {
    setSelectedSmall("");
  }, [queryValue.medium]);

  return (
    <>
      <form className="flex flex-col gap-3 p-2" onSubmit={submitUrl}>
        <div className="flex items-center gap-2">
          <label htmlFor="URL" className="w-20 text-2xl font-bold text-center">
            URL
          </label>
          <input
            type="text"
            id="URL"
            value={queryValue.URL}
            onChange={(e) =>
              setQueryValue({ ...queryValue, URL: e.target.value })
            }
            className="bg-white flex-1 p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <InputForm
          label="대분류"
          data={largeList}
          setter={setSelectedLarge}
          handleValue={(value) =>
            setQueryValue({ ...queryValue, large: value })
          }
        />
        <InputForm
          label="중분류"
          data={mediumList}
          setter={setSelectedMedium}
          handleValue={(value) =>
            setQueryValue({ ...queryValue, medium: value })
          }
        />
        <InputForm
          label="소분류"
          data={smallList}
          setter={setSelectedSmall}
          handleValue={(value) =>
            setQueryValue({ ...queryValue, small: value })
          }
        />
        <button className="p-2 border-2 text-white rounded-sm text-lg md:text-2xl cursor-pointer hover:bg-gray-500 active:scale-90 w-full">
          확인
        </button>
      </form>
      <div>{queryValue.URL}</div>
      <div>{queryValue.large}</div>
      <div>{queryValue.medium}</div>
      <div>{queryValue.small}</div>
      {/* <div>{selectedLarge}</div>
      <div>{selectedMedium}</div>
      <div>{selectedSmall}</div> */}
    </>
  );
}

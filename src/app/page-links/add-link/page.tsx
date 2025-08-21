"use client";

import InputForm from "../components/InputForm";
import useCategory from "@/app/page-links/hooks/useCategory";
import { useState, useEffect } from "react";
import useUrlValidation from "../hooks/validation/useUrlValidation";
import { postToURL } from "../controllers/axiosLink";

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

  const [url, setUrl] = useState("");
  const [hasSubmit, setHasSubmit] = useState(false);

  const responseData = {
    URL: url,
    large: selectedLarge,
    medium: selectedMedium,
    small: selectedSmall,
  };
  const { validationMessage } = useUrlValidation(responseData);

  const resetValue = () => {
    setUrl("");
    setSelectedLarge("");
    setSelectedMedium("");
    setSelectedSmall("");
  };

  const submitUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validationMessage) {
      alert(validationMessage);
      return;
    }
    setHasSubmit(!hasSubmit);
    await postToURL(responseData);
    resetValue();
  };

  useEffect(() => {
    setSelectedMedium("");
    setSelectedSmall("");
  }, [selectedLarge]);

  useEffect(() => {
    setSelectedSmall("");
  }, [selectedMedium]);

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
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-white flex-1 p-2 border border-gray-300 rounded text-black"
          />
        </div>
        <InputForm
          label="대분류"
          data={largeList}
          selectedValue={selectedLarge}
          setSelectedValue={setSelectedLarge}
          hasSubmit={hasSubmit}
          handleValue={(value) => {
            setSelectedLarge(value);
          }}
        />
        <InputForm
          label="중분류"
          data={mediumList}
          parentValue={selectedLarge}
          selectedValue={selectedMedium}
          setSelectedValue={setSelectedMedium}
          hasSubmit={hasSubmit}
          handleValue={(value) => {
            setSelectedMedium(value);
          }}
        />
        <InputForm
          label="소분류"
          data={smallList}
          parentValue={selectedMedium}
          selectedValue={selectedSmall}
          setSelectedValue={setSelectedSmall}
          hasSubmit={hasSubmit}
          handleValue={(value) => {
            setSelectedSmall(value);
          }}
        />
        <button className="p-2 border-2 text-white rounded-sm text-lg md:text-2xl cursor-pointer hover:bg-gray-500 active:scale-90 w-full">
          확인
        </button>
      </form>
      <div>{url}</div>
      <div>{selectedLarge}</div>
      <div>{selectedMedium}</div>
      <div>{selectedSmall}</div>
    </>
  );
}

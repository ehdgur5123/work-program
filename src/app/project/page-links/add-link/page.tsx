"use client";
import InputForm from "../components/InputForm";
import useCategory from "@/app/project/page-links/hooks/useCategory";
import { useState, useEffect } from "react";
import useUrlValidation from "../hooks/validation/useUrlValidation";
import { LoadingSpinnerSmall } from "@/app/components/Loading";
import useAddLink from "@/app/project/page-links/hooks/useAddLink";

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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", color: "text-black" });
  const { mutate: postToURL } = useAddLink();
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

  const submitUrl = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validationMessage) {
      setMessage({ text: validationMessage, color: "text-red" });
      return;
    }

    setIsLoading(true);
    setHasSubmit(true);

    postToURL(responseData, {
      onSuccess: () => {
        setMessage({ text: "추가가 완료되었습니다.", color: "text-green" });
        resetValue();
        setHasSubmit(false);
        setIsLoading(false);
      },
      onError: () => {
        setMessage({
          text: "추가에 실패하였습니다.",
          color: "text-red",
        });
        setIsLoading(false);
      },
    });
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
      <div className={`text-center mt-3 h-5 ${message.color}-500`}>
        {isLoading ? <LoadingSpinnerSmall /> : message.text}
      </div>
    </>
  );
}

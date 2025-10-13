"use client";

import { useEffect, useState } from "react";

interface QueryValue {
  URL: string;
  large: string;
  medium: string;
  small: string;
}

export default function useUrlValidation(queryValue: QueryValue) {
  const [validationMessage, setValidationMessage] = useState<string>("");

  useEffect(() => {
    if (!queryValue.URL) {
      setValidationMessage("URL을 입력하세요.");
      return;
    }

    const urlRegex = /^https?:\/\/.+$/;
    if (!urlRegex.test(queryValue.URL)) {
      setValidationMessage("올바른 URL 형식이 아닙니다.");
      return;
    }

    if (!queryValue.large) {
      setValidationMessage("대분류를 입력하세요.");
      return;
    }

    if (!queryValue.medium) {
      setValidationMessage("중분류를 입력하세요.");
      return;
    }

    if (!queryValue.small) {
      setValidationMessage("소분류를 입력하세요.");
      return;
    }

    setValidationMessage(""); // 통과 시 메시지 제거
  }, [queryValue]); // URL이 바뀔 때마다 검사

  return { validationMessage };
}

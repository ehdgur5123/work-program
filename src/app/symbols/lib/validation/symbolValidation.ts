import { MessageType, SymbolItemType } from "@/app/symbols/types";

export function nameAddValidation(
  submitNameList: string[],
  addNameValue: string
): MessageType {
  if (addNameValue.trim().length === 0)
    return { text: "이름을 입력하세요.", state: "error" };
  if (submitNameList.some((name) => name === addNameValue))
    return { text: "이미 있는 글자 입니다.", state: "error" };
  return { text: "추가가 완료되었습니다.", state: "success" };
}

export function nameDeleteValidation(deleteName: string): MessageType {
  if (!deleteName) return { text: "알 수 없는 에러!", state: "error" };
  return { text: "삭제가 완료되었습니다.", state: "success" };
}

export function symbolUpdateValidation(
  initialSymbolData: SymbolItemType,
  updatedSymbolData: SymbolItemType
): MessageType {
  if (initialSymbolData === updatedSymbolData)
    return { text: "변경사항이 없습니다.", state: "error" };

  const requiredFields: ("code" | "html" | "unicode")[] = [
    "code",
    "html",
    "unicode",
  ];

  const emptyField = requiredFields.find(
    (field) => updatedSymbolData[field].trim().length === 0
  );

  if (emptyField) {
    return { text: `${emptyField}에 값이 없습니다.`, state: "error" };
  }

  return { text: "수정이 완료되었습니다.", state: "success" };
}

export function symbolCreateValidation(
  createdSymbolData: SymbolItemType,
  symbolDataList: SymbolItemType[]
): MessageType {
  if (createdSymbolData.symbol === "") {
    return { text: "기호는 필수값입니다.", state: "error" };
  }

  if (
    symbolDataList.some((item) =>
      item.symbol.includes(createdSymbolData.symbol)
    )
  ) {
    return { text: "이미 존재하는 기호입니다.", state: "error" };
  }

  return { text: "생성이 완료되었습니다.", state: "success" };
}

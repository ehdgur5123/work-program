import { MessageType } from "@/app/symbols/types";

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

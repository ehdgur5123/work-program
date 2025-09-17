import { MessageType } from "@/app/symbols/types";

export default function nameValidation(
  submitNameList: string[],
  addNameValue: string
): MessageType {
  if (submitNameList.some((name) => name === addNameValue))
    return { text: "이미 있는 글자 입니다.", state: "error" };
  return { text: "추가가 완료되었습니다.", state: "success" };
}

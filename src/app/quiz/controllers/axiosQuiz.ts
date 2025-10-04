import axios from "@/lib/axios";
import { QuizDocument } from "../type";

const URL = "/quiz/api";

export async function postQuiz(inputValue: string) {
  const res = await axios.post<QuizDocument>(URL, { inputValue });
  console.log(res.data);
  console.log(res.status);
  return res.data;
}

import axios from "@/lib/axios";
import { QuizResponse } from "../type";

const URL = "/quiz/api";

export async function postQuiz(inputValue: string) {
  const res = await axios.post<QuizResponse>(URL, { inputValue });
  return res.data;
}

import axios from "@/lib/axios";
import { QuizDocument } from "../type";

const URL = "project/quiz/api";

export async function postQuiz(inputValue: string) {
  const res = await axios.post<QuizDocument>(URL, { inputValue });
  return res.data;
}

export async function deleteQuiz(id: string) {
  const res = await axios.delete(`${URL}/${id}`);
  return res.data;
}

export async function getSubjectList() {
  const res = await axios.get(`${URL}/subject/list`);
  return res.data;
}

export async function getSubjectContent(subject: string) {
  const res = await axios.get(`${URL}/subject/content`, {
    params: { subject },
  });
  return res.data;
}

export async function deleteSubject(subject: string) {
  const res = await axios.delete(`${URL}/subject/content`, {
    params: { subject },
  });
  return res.data;
}

import { ObjectId } from "mongodb";

export interface QuizResponse {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface QuizDocument extends QuizResponse {
  id: ObjectId; // MongoDB 원래 ObjectId
  subject: string;
  level: number;
}

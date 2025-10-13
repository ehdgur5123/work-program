import { ObjectId } from "mongodb";

export interface QuizResponse {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface QuizDocument extends QuizResponse {
  _id: ObjectId | string; // MongoDB 원래 ObjectId
  subject: string;
  level: number;
}

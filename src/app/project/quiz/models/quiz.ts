import { Schema, model, models } from "mongoose";

const QuizSchema = new Schema({
  subject: { type: String, required: true },
  level: { type: Number, required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
  explanation: { type: String, required: true },
});

export const QuizModel = models.Quiz || model("Quiz", QuizSchema);

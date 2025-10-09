import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { QuizResponse, QuizDocument } from "@/app/quiz/type";
import { QuizModel } from "@/app/quiz/models/quiz";

const MAX_LEVEL = 100;

// OPEN AI KEY
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 문제의 보기를 랜덤으로 섞는 함수
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

// OPEN AI 요청
async function openAiResponse(
  inputValue: string,
  randomLevel: number
): Promise<QuizResponse> {
  const content = `너는 ${inputValue} 전문가야. ${inputValue} 관련하여 객관식 퀴즈를 만들어줘.
    - 난이도는 초등학교 수준(1)부터 고등학교 수준${MAX_LEVEL}까지로 하고, 내가 현재 원하는 난이도는 ${randomLevel}이야.
    - 오답은 현실적이어야 하고, 답과 혼동될 수 있는 수준으로 만들어
    - 난이도는 explanation 마지막에 (난이도: 숫자) 형식으로 표시해
    - explanation의 글자 수는 150자 이내로 해. 
    - options를 만들 때, 번호는 생략해.`;

  const completion = await openai.responses.create({
    model: "gpt-5-mini",
    input: [
      { role: "system", content: "너는 객관식 퀴즈 생성기야." },
      {
        role: "user",
        content: content,
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "quiz_schema",
        schema: {
          type: "object",
          properties: {
            question: { type: "string" },
            options: {
              type: "array",
              items: { type: "string" },
              minItems: 4,
              maxItems: 4,
            },
            answer: { type: "string" },
            explanation: { type: "string", maxLength: 200 },
          },
          required: ["question", "options", "answer", "explanation"],
          additionalProperties: false,
        },
      },
    },
  });

  const quiz = JSON.parse(completion.output_text);

  if (!quiz.options.includes(quiz.answer)) {
    throw new Error("Answer is not in options");
  }

  const randomOptions = shuffleArray(quiz.options);
  const convertQuiz = { ...quiz, options: randomOptions };
  return convertQuiz;
}

// 데이터베이스(몽고DB) 저장 함수
async function mongoDbResponse(
  inputValue: string,
  randomLevel: number,
  responsedQuiz: QuizResponse
) {
  try {
    await connectToDatabase();
    const saveToDatabase = {
      subject: inputValue,
      level: randomLevel,
      ...responsedQuiz,
    };
    const savedQuiz = await QuizModel.create(saveToDatabase);
    return {
      _id: savedQuiz._id.toString(),
      subject: savedQuiz.subject,
      level: savedQuiz.level,
      ...responsedQuiz,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Database Save wrong");
  }
}

// POST 요청
export async function POST(req: Request) {
  try {
    const { inputValue } = await req.json();
    if (!inputValue) {
      return NextResponse.json(
        { error: "inputValue required" },
        { status: 400 }
      );
    }

    // 난이도 설정
    const randomLevel = Math.floor(Math.random() * MAX_LEVEL) + 1;
    // OPEN AI 퀴즈 요청&응답
    const responsedQuiz = await openAiResponse(inputValue, randomLevel);
    // 데이터베이스(몽고DB) 저장
    const savedQuiz: QuizDocument = await mongoDbResponse(
      inputValue,
      randomLevel,
      responsedQuiz
    );

    return NextResponse.json(savedQuiz, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 문제의 보기를 랜덤으로 섞는 함수
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export async function POST(req: Request) {
  try {
    const { inputValue } = await req.json();
    if (!inputValue) {
      return NextResponse.json(
        { error: "inputValue required" },
        { status: 400 }
      );
    }
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const content = `
너는 ${inputValue} 전문가야. ${inputValue} 관련하여 객관식 퀴즈를 만들어줘.
- 난이도는 초등학교 수준(1)부터 박사 수준(1000)까지로 하고, 내가 현재 원하는 난이도는 ${randomNumber}이야. 
- 오답은 현실적이어야 하고, 답과 혼동될 수 있는 수준으로 만들어
- 난이도는 explanation 마지막에 (난이도: 숫자) 형식으로 표시해
- explanation의 글자 수는 150자 이내로 해. 
- options를 만들 때, 번호는 생략해.
`;
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
    const randomOptions = shuffleArray(quiz.options);
    const convertQuiz = { ...quiz, options: randomOptions };
    console.log(convertQuiz);
    return NextResponse.json(convertQuiz);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

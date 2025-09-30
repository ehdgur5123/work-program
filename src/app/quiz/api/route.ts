// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { inputValue } = await req.json();
    if (!inputValue) {
      return NextResponse.json(
        { error: "inputValue required" },
        { status: 400 }
      );
    }

    const completion = await openai.responses.create({
      model: "gpt-5-nano",
      input: [
        { role: "system", content: "너는 객관식 퀴즈 생성기야." },
        { role: "user", content: `${inputValue} 관련 퀴즈 1개 만들어줘` },
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
              explanation: { type: "string", maxLength: 100 },
            },
            required: ["question", "options", "answer", "explanation"],
            additionalProperties: false,
          },
        },
      },
    });

    console.log(completion.output_text);
    const quiz = JSON.parse(completion.output_text);
    return NextResponse.json(quiz);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

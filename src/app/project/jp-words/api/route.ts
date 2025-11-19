// http://localhost:3000/project/jp-words/api
import { NextResponse } from "next/server";
import { TranslationServiceClient } from "@google-cloud/translate";
import OpenAI from "openai";

// 🔐 환경변수에서 서비스 계정 JSON 파싱
const serviceAccount = JSON.parse(
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON!
);

// 🔥 private_key에서 \n 복구
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

// 📌 Google Translation Client
const translationClient = new TranslationServiceClient({
  credentials: serviceAccount,
});

// 🔑 OpenAI Client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// OpenAI 호출 (일본어 → 한국어 발음)
async function openAiResponse(japanese: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-nano", // 모델 변경
    messages: [
      {
        role: "system",
        content:
          "너는 일본어를 한국어 발음으로 변환해주는 프로그램이야. 예: 'こんにちは' → '곤니치와'. 문장이라면 띄워쓰기를 하고, 다른 부연 설명은 하지마.",
      },
      {
        role: "user",
        content: `${japanese}의 한국어 발음은?`,
      },
    ],
    temperature: 0, // 안정적인 반복 결과
    max_tokens: 500, // 단일 발음 응답에 충분
  });

  // ⚡ 안전하게 단일 문자열 반환
  const pronunciation = completion.choices?.[0]?.message?.content?.trim() ?? "";

  return pronunciation;
}

const projectId = process.env.GOOGLE_PROJECT_ID!;
const location = "global";

export async function GET() {
  const korean = "나랑 결혼해 줄래?"; // 테스트 문장

  // 📍 한국어 → 일본어 변환
  const [response] = await translationClient.translateText({
    parent: `projects/${projectId}/locations/${location}`,
    contents: [korean],
    mimeType: "text/plain",
    sourceLanguageCode: "ko",
    targetLanguageCode: "ja",
  });

  const japanese = response.translations?.[0].translatedText || "";
  const pronunciation = await openAiResponse(japanese);

  return NextResponse.json({
    korean,
    japanese,
    pronunciation,
  });
}

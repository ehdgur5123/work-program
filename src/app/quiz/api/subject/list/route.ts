import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { QuizModel } from "@/app/quiz/models/quiz";

export async function GET() {
  try {
    await connectToDatabase();

    const subjects = await QuizModel.distinct("subject");

    return NextResponse.json(subjects, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

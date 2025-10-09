import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { QuizModel } from "@/app/quiz/models/quiz";

export async function GET(req: NextRequest) {
  try {
    const subject = req.nextUrl.searchParams.get("subject");
    if (!subject)
      return NextResponse.json({ error: "Missing subject" }, { status: 400 });
    await connectToDatabase();

    const subjects = await QuizModel.find({ subject: subject });

    return NextResponse.json(subjects, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

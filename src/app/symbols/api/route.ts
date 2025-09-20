// app/api/symbols/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { SymbolModel } from "@/app/symbols/models/symbol";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await connectToDatabase();
    const symbols = await SymbolModel.find({});
    revalidatePath("/symbols");

    return NextResponse.json(symbols, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

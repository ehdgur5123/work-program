// app/api/symbols/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { SymbolModel } from "@/app/symbols/models/Symbol";
import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  await connectToDatabase();
  const symbols = await SymbolModel.find({});

  const res = NextResponse.json(symbols);
  res.headers.set("Access-Control-Allow-Origin", "*"); // 모든 도메인 허용 (필요 시 조절)
  revalidatePath("/symbols");
  return res;
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const { symbol, unicode, html, name, code } = body;

  if (!symbol) {
    return NextResponse.json({ error: "symbol is required" }, { status: 400 });
  }

  try {
    // 🔍 symbol 중복 확인
    const existingSymbol = await SymbolModel.findOne({ symbol });

    if (existingSymbol) {
      return NextResponse.json(
        { error: "Symbol already exists" },
        { status: 409 } // 409 Conflict
      );
    }

    // 📌 새 기호 저장
    const newSymbol = await SymbolModel.create({
      symbol,
      unicode: unicode,
      html: html,
      name: name || [],
      code: code,
    });

    const res = NextResponse.json(newSymbol, { status: 201 });
    res.headers.set("Access-Control-Allow-Origin", "*");
    revalidatePath("/symbols");
    return res;
  } catch {
    return NextResponse.json(
      { error: "Failed to create symbol" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const { ids } = await req.json();
    await SymbolModel.deleteMany({ _id: { $in: ids } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete symbols" },
      { status: 500 }
    );
  }
}

// CORS 프리플라이트 요청 처리
export async function OPTIONS() {
  return new Response(null, {
    status: 204, // No Content
    headers: {
      "Access-Control-Allow-Origin": "*", // 모든 도메인 허용 (필요 시 조절)
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

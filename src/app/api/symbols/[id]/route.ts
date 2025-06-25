import { connectToDatabase } from "@/lib/mongodb";
import { SymbolModel } from "@/app/symbols/models/Symbol";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const symbol = await SymbolModel.findById(id);

    if (!symbol) {
      const res = NextResponse.json(
        { error: "Symbol not found" },
        { status: 404 }
      );
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }

    const res = NextResponse.json(symbol);
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  } catch {
    const res = NextResponse.json(
      { error: "Error fetching symbol" },
      { status: 500 }
    );
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const { name } = await req.json();

    if (!name || typeof name !== "string") {
      const res = NextResponse.json({ error: "잘못된 name" }, { status: 400 });
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }
    const updated = await SymbolModel.findByIdAndUpdate(
      id,
      { $addToSet: { name } },
      { new: true }
    );

    const res = NextResponse.json(updated);
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  } catch {
    const res = NextResponse.json({ error: "업데이트 실패" }, { status: 500 });
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const { id } = await params;

  try {
    const body = await req.json().catch(() => ({}));
    const name = body?.name;

    if (name && typeof name === "string") {
      const updated = await SymbolModel.findByIdAndUpdate(
        id,
        { $pull: { name } },
        { new: true }
      );
      const res = NextResponse.json(updated);
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    } else {
      const deleted = await SymbolModel.findByIdAndDelete(id);
      if (!deleted) {
        const res = NextResponse.json(
          { error: "삭제할 심볼이 없습니다." },
          { status: 404 }
        );
        res.headers.set("Access-Control-Allow-Origin", "*");
        return res;
      }
      const res = NextResponse.json({ message: "삭제 성공", deleted });
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }
  } catch {
    const res = NextResponse.json({ error: "삭제 실패" }, { status: 500 });
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  }
}

// CORS 프리플라이트 요청 처리
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

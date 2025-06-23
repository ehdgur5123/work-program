import { connectToDatabase } from "@/lib/mongodb";
import { SymbolModel } from "@/app/symbols/models/Symbol";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const symbol = await SymbolModel.findById(id);

    if (!symbol) {
      return NextResponse.json({ error: "Symbol not found" }, { status: 404 });
    }

    return NextResponse.json(symbol);
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching symbol" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const { name } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "잘못된 name" }, { status: 400 });
    }
    const updated = await SymbolModel.findByIdAndUpdate(
      id,
      { $addToSet: { name } }, // 중복 방지
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "업데이트 실패" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await connectToDatabase();
  const { id } = await context.params;

  try {
    // 요청 바디에서 name이 있는지 확인
    const body = await req.json().catch(() => ({}));
    const name = body?.name;

    if (name && typeof name === "string") {
      // ✅ name 하나 삭제
      const updated = await SymbolModel.findByIdAndUpdate(
        id,
        { $pull: { name } },
        { new: true }
      );
      return NextResponse.json(updated);
    } else {
      // ✅ 심볼 전체 삭제
      const deleted = await SymbolModel.findByIdAndDelete(id);
      if (!deleted) {
        return NextResponse.json(
          { error: "삭제할 심볼이 없습니다." },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: "삭제 성공", deleted });
    }
  } catch (err) {
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}

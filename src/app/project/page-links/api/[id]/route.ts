// src/app/page-links/api/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { LinksModel } from "@/app/project/page-links/models/links";

interface Data {
  title?: string;
  content?: string;
  category?: { large?: string; medium?: string; small?: string };
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ params는 Promise
) {
  const { id } = await context.params; // ✅ 객체 자체를 await 후 디스트럭처링

  try {
    await connectToDatabase();
    const deleted = await LinksModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "삭제할 데이터가 없습니다." },
        { status: 404, headers: corsHeaders }
      );
    }

    // 실제 목록 페이지 경로로 조정
    revalidatePath("/page-links");

    return NextResponse.json(
      { message: "삭제 성공", deleted },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "삭제 실패" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const { id } = await context.params;

  try {
    const body = await req.json();
    const { title, content, category } = body;

    const updateData: Data = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) {
      updateData.category = {};
      if (category.large) updateData.category.large = category.large;
      if (category.medium) updateData.category.medium = category.medium;
      if (category.small) updateData.category.small = category.small;
    }

    const updated = await LinksModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).lean();

    if (!updated) {
      return NextResponse.json(
        { error: "수정할 데이터가 없습니다." },
        { status: 404 }
      );
    }

    revalidatePath("/page-links");

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

// (선택) CORS preflight 대응
export function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

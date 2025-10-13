import { NextResponse } from "next/server";
// import links from "@/app/page-links/api/links.json";
import { connectToDatabase } from "@/lib/mongodb";
import { LinksModel } from "@/app/project/page-links/models/links";

type CategoryTree = {
  [large: string]: {
    sum: number;
    medium: {
      [medium: string]: {
        sum: number;
        small: {
          [small: string]: {
            sum: number;
          };
        };
      };
    };
  };
};

export async function GET() {
  await connectToDatabase();
  const category: CategoryTree = {};
  const links = await LinksModel.find({});

  for (const link of links) {
    const { large, medium, small } = link.category;

    // 대분류가 없으면 초기화
    if (!category[large]) {
      category[large] = {
        sum: 0,
        medium: {},
      };
    }
    category[large].sum++;

    // 중분류가 없으면 초기화
    if (!category[large].medium[medium]) {
      category[large].medium[medium] = {
        sum: 0,
        small: {},
      };
    }
    category[large].medium[medium].sum++;

    // 소분류가 없으면 초기화
    if (!category[large].medium[medium].small[small]) {
      category[large].medium[medium].small[small] = { sum: 0 };
    }
    category[large].medium[medium].small[small].sum++;
  }

  return NextResponse.json(category);
}

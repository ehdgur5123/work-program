import { NextResponse } from "next/server";
import links from "@/app/api/page-links/links.json";

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
  const summary: CategoryTree = {};

  for (const link of links) {
    const { large, medium, small } = link.category;

    // 대분류가 없으면 초기화
    if (!summary[large]) {
      summary[large] = {
        sum: 0,
        medium: {},
      };
    }
    summary[large].sum++;

    // 중분류가 없으면 초기화
    if (!summary[large].medium[medium]) {
      summary[large].medium[medium] = {
        sum: 0,
        small: {},
      };
    }
    summary[large].medium[medium].sum++;

    // 소분류가 없으면 초기화
    if (!summary[large].medium[medium].small[small]) {
      summary[large].medium[medium].small[small] = { sum: 0 };
    }
    summary[large].medium[medium].small[small].sum++;
  }

  return NextResponse.json(summary);
}

// LinkCategory: 대분류, 중분류, 소분류로 구성된 카테고리 구조
export interface LinkCategory {
  large: string;
  medium: string;
  small: string;
}

// LinkItem: 개별 링크 정보를 나타냄
export interface LinkItem {
  _id: string;
  url: string;
  title: string;
  content: string;
  logo: string;
  category: LinkCategory;
}

export interface PaginatedLinkResponse {
  data: LinkItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CategoryProps {
  selectedLarge: string;
  selectedMedium: string;
  selectedSmall: string;
}

export interface Data {
  title?: string;
  content?: string;
  category?: { large?: string; medium?: string; small?: string };
}

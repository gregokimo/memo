import type { MemoLabel } from "@/components/labelColor";

// 메모 모양. 메모는 Supabase의 memos 표에 저장한다 (src/lib/memoApi.ts).

export type Category = "업무" | "개인" | "아이디어" | "할일";

/** 문단 안의 글. 문자열은 보통 글, { strong }은 굵은 강조 */
export type RichText = (string | { strong: string })[];

export type MemoBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; content: RichText }
  | { type: "list"; items: (string | RichText)[] };

export type Memo = {
  id: string;
  title: string;
  preview: string;
  /** 만든 시각 (ISO 문자열) */
  createdAt: string;
  label: MemoLabel;
  category: Category;
  pinned: boolean;
  body: MemoBlock[];
};

export const CATEGORIES: Category[] = ["업무", "개인", "아이디어", "할일"];

import type { MemoLabel } from "@/components/labelColor";

// 아직 저장소가 없어 Figma 시안의 예시 메모를 그대로 씁니다.

export type Category = "업무" | "개인" | "아이디어";

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
  /** 홈 목록에 보이는 날짜 (예: 오늘, 어제). 비어 있으면 createdAt으로 계산한다 */
  date: string;
  /** 만든 시각 (상세 화면에 보임) */
  createdAt: string;
  label: MemoLabel;
  category: Category;
  pinned: boolean;
  body: MemoBlock[];
};

export const CATEGORIES: Category[] = ["업무", "개인", "아이디어"];

export const TOTAL_MEMO_COUNT = 128;

export const memos: Memo[] = [
  {
    id: "design-review",
    title: "디자인 리뷰 회의록",
    preview: "검수 기준과 다음 할 일 정리",
    date: "오늘",
    createdAt: "2026-10-30T09:12:00+09:00",
    label: "blue",
    category: "업무",
    pinned: true,
    body: [
      { type: "heading", text: "회의 요약" },
      { type: "paragraph", content: ["목표는 개발자가 ", { strong: "그대로 구현할 수 있는 시안" }, "이다."] },
      { type: "subheading", text: "결정한 것" },
      {
        type: "list",
        items: ["칩, 카드, 버튼은 컴포넌트로 통일", "색과 간격은 변수로만 연결", "레이어 이름은 역할 이름으로"],
      },
      { type: "subheading", text: "다음 할 일" },
      {
        type: "paragraph",
        content: [{ strong: "금요일까지" }, " 상세 화면과 쓰기 화면을 마무리하고, 다음 회의에서 함께 채점한다."],
      },
      { type: "subheading", text: "남은 질문" },
      { type: "paragraph", content: [{ strong: "다크 모드 색" }, "은 다음 회의에서 정한다."] },
    ],
  },
  {
    id: "hiking",
    title: "주말 등산 준비",
    preview: "물 두 병, 간식, 바람막이 챙기기",
    date: "어제",
    createdAt: "2026-10-29T21:40:00+09:00",
    label: "green",
    category: "개인",
    pinned: true,
    body: [
      { type: "subheading", text: "챙길 것" },
      { type: "list", items: ["물 두 병", "간식", "바람막이"] },
    ],
  },
  {
    id: "groceries",
    title: "장보기 목록",
    preview: "우유, 계란, 사과, 커피 원두",
    date: "오늘",
    createdAt: "2026-10-30T08:05:00+09:00",
    label: "pink",
    category: "개인",
    pinned: false,
    body: [{ type: "list", items: ["우유", "계란", "사과", "커피 원두"] }],
  },
  {
    id: "app-icon",
    title: "앱 아이콘 아이디어",
    preview: "메모지 모서리가 접힌 모양",
    date: "오늘",
    createdAt: "2026-10-30T07:30:00+09:00",
    label: "orange",
    category: "아이디어",
    pinned: false,
    body: [{ type: "paragraph", content: ["메모지 모서리가 접힌 모양"] }],
  },
  {
    id: "books",
    title: "읽을 책",
    preview: "디자인 시스템 책 두 권",
    date: "어제",
    createdAt: "2026-10-29T18:20:00+09:00",
    label: "green",
    category: "개인",
    pinned: false,
    body: [{ type: "paragraph", content: ["디자인 시스템 책 두 권"] }],
  },
];

export function getMemo(id: string): Memo | undefined {
  return memos.find((memo) => memo.id === id);
}

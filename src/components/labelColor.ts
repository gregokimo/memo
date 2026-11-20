// 메모의 색 라벨

export type MemoLabel = "blue" | "green" | "orange" | "pink";

export const LABELS: { value: MemoLabel; name: string }[] = [
  { value: "blue", name: "파랑" },
  { value: "green", name: "초록" },
  { value: "orange", name: "주황" },
  { value: "pink", name: "분홍" },
];

/** 연한 배경 + 진한 글자색 (Memo/Item의 색 칸, Badge가 함께 쓴다) */
export const labelColor: Record<MemoLabel, string> = {
  blue: "bg-label-blue-soft text-label-blue",
  green: "bg-label-green-soft text-label-green",
  orange: "bg-label-orange-soft text-label-orange",
  pink: "bg-label-pink-soft text-label-pink",
};

/** 진한 색 칠하기 (Label/Dot) */
export const labelFill: Record<MemoLabel, string> = {
  blue: "bg-label-blue",
  green: "bg-label-green",
  orange: "bg-label-orange",
  pink: "bg-label-pink",
};

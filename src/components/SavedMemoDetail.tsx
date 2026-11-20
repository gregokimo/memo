"use client";

import { notFound } from "next/navigation";
import { MemoDetailScreen } from "./MemoDetailScreen";
import { useSavedMemos } from "@/lib/memoStore";

// 이 브라우저에 저장한 메모의 상세 화면. 저장소를 읽은 뒤에 찾고, 없으면 404.
export function SavedMemoDetail({ id }: { id: string }) {
  const saved = useSavedMemos();
  if (saved === null) return null;
  const memo = saved.find((m) => m.id === id);
  if (!memo) notFound();
  return <MemoDetailScreen memo={memo} />;
}

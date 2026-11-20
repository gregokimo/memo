"use client";

import type { Memo } from "./memos";

// 작성 중인 초안. 저장하기 전까지는 이 브라우저(로컬 스토리지)에만 둔다.
// 저장한 메모는 Supabase에 들어간다 (memoApi.ts).

const DRAFT_KEY = "memo-app:draft";

export type Draft = Pick<Memo, "title" | "category" | "label"> & { html: string };

export function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft: Draft | null) {
  try {
    if (draft === null) localStorage.removeItem(DRAFT_KEY);
    else localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // 저장 공간이 꽉 찼거나 막혀 있으면 조용히 넘어간다
  }
}

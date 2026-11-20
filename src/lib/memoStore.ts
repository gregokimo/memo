"use client";

import { useSyncExternalStore } from "react";
import type { Memo } from "./memos";

// 이 브라우저(로컬 스토리지)에 저장한 메모와 작성 중인 초안.
// 서버에서는 읽을 수 없으므로, 서버 렌더와 첫 화면에서는 null(아직 모름)을 돌려준다.

const MEMOS_KEY = "memo-app:memos";
const DRAFT_KEY = "memo-app:draft";
const CHANGE_EVENT = "memo-app:change";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 저장 공간이 꽉 찼거나 막혀 있으면 조용히 넘어간다
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === MEMOS_KEY) onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage); // 다른 탭에서 바뀐 경우
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

// useSyncExternalStore는 같은 값이면 같은 참조를 원하므로 원본 문자열 기준으로 캐시한다
let cachedRaw: string | null | undefined;
let cachedMemos: Memo[] = [];

function getSnapshot(): Memo[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(MEMOS_KEY);
  } catch {}
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedMemos = read<Memo[]>(MEMOS_KEY, []);
  }
  return cachedMemos;
}

/** 저장한 메모 (새로 쓴 것이 앞). 아직 읽지 못했으면 null */
export function useSavedMemos(): Memo[] | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}

export function saveMemo(memo: Memo) {
  write(MEMOS_KEY, [memo, ...getSnapshot()]);
}

export type Draft = Pick<Memo, "title" | "category" | "label"> & { html: string };

export function loadDraft(): Draft | null {
  return read<Draft | null>(DRAFT_KEY, null);
}

export function saveDraft(draft: Draft | null) {
  write(DRAFT_KEY, draft);
}

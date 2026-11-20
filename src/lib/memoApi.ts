import type { MemoLabel } from "@/components/labelColor";
import type { Category, Memo, MemoBlock } from "./memos";
import { supabase } from "./supabase";

// Supabase memos 표 읽고 쓰기

type MemoRow = {
  id: string;
  title: string;
  preview: string;
  body: MemoBlock[];
  category: Category;
  label: MemoLabel;
  pinned: boolean;
  created_at: string;
};

const COLUMNS = "id, title, preview, body, category, label, pinned, created_at";

function toMemo(row: MemoRow): Memo {
  return {
    id: row.id,
    title: row.title,
    preview: row.preview,
    body: row.body,
    category: row.category,
    label: row.label,
    pinned: row.pinned,
    createdAt: row.created_at,
  };
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** 모든 메모, 새로 만든 것부터 */
export async function fetchMemos(): Promise<Memo[]> {
  const { data, error } = await supabase
    .from("memos")
    .select(COLUMNS)
    .order("created_at", { ascending: false })
    .returns<MemoRow[]>();
  if (error) throw new Error(`메모를 불러오지 못했어요: ${error.message}`);
  return data.map(toMemo);
}

/** 메모 하나. 없으면 null */
export async function fetchMemo(id: string): Promise<Memo | null> {
  if (!UUID.test(id)) return null;
  const { data, error } = await supabase.from("memos").select(COLUMNS).eq("id", id).maybeSingle<MemoRow>();
  if (error) throw new Error(`메모를 불러오지 못했어요: ${error.message}`);
  return data ? toMemo(data) : null;
}

export type NewMemo = Pick<Memo, "title" | "preview" | "body" | "category" | "label">;

/** 새 메모를 저장하고 id를 돌려준다 */
export async function createMemo(memo: NewMemo): Promise<string> {
  const { data, error } = await supabase.from("memos").insert(memo).select("id").single<{ id: string }>();
  if (error) throw new Error(`메모를 저장하지 못했어요: ${error.message}`);
  return data.id;
}

export async function setMemoPinned(id: string, pinned: boolean): Promise<void> {
  const { error } = await supabase.from("memos").update({ pinned }).eq("id", id);
  if (error) throw new Error(`고정 여부를 바꾸지 못했어요: ${error.message}`);
}

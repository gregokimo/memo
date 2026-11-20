import { Suspense } from "react";
import type { Metadata } from "next";
import { MemoDetailScreen } from "@/components/MemoDetailScreen";
import { SavedMemoDetail } from "@/components/SavedMemoDetail";
import { getMemo, memos } from "@/lib/memos";

export function generateStaticParams() {
  return memos.map((memo) => ({ id: memo.id }));
}

export async function generateMetadata({ params }: PageProps<"/memos/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: getMemo(id)?.title ?? "메모" };
}

// 이 브라우저에 저장한 메모는 주소를 미리 알 수 없어서, 주소를 읽는 부분을 Suspense로 감싼다
export default function MemoDetailPage({ params }: PageProps<"/memos/[id]">) {
  return (
    <Suspense fallback={null}>
      <MemoDetail params={params} />
    </Suspense>
  );
}

async function MemoDetail({ params }: { params: PageProps<"/memos/[id]">["params"] }) {
  const { id } = await params;
  const memo = getMemo(id);
  // 예시 메모가 아니면 이 브라우저에 저장한 메모에서 찾는다
  if (!memo) return <SavedMemoDetail id={id} />;

  return <MemoDetailScreen memo={memo} />;
}

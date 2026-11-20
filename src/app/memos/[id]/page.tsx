import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MemoDetailScreen } from "@/components/MemoDetailScreen";
import { fetchMemo } from "@/lib/memoApi";

export async function generateMetadata({ params }: PageProps<"/memos/[id]">): Promise<Metadata> {
  const { id } = await params;
  const memo = await fetchMemo(id);
  return { title: memo?.title ?? "메모" };
}

// 메모는 Supabase에서 요청할 때마다 읽으므로, 주소와 메모를 읽는 부분을 Suspense로 감싼다
export default function MemoDetailPage({ params }: PageProps<"/memos/[id]">) {
  return (
    <Suspense fallback={null}>
      <MemoDetail params={params} />
    </Suspense>
  );
}

async function MemoDetail({ params }: { params: PageProps<"/memos/[id]">["params"] }) {
  const { id } = await params;
  const memo = await fetchMemo(id);
  if (!memo) notFound();

  return <MemoDetailScreen memo={memo} />;
}

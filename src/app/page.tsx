import { Suspense } from "react";
import { connection } from "next/server";
import { HomeScreen } from "@/components/HomeScreen";
import { formatToday, relativeDate } from "@/lib/dates";
import { fetchMemos } from "@/lib/memoApi";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeData />
    </Suspense>
  );
}

// 메모와 오늘 날짜는 요청할 때마다 새로 읽는다
async function HomeData() {
  await connection();
  const now = new Date();
  const memos = await fetchMemos();

  return (
    <HomeScreen
      today={formatToday(now)}
      memos={memos.map((memo) => ({ ...memo, date: relativeDate(memo.createdAt, now) }))}
    />
  );
}

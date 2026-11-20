import { Suspense } from "react";
import { connection } from "next/server";
import { HomeScreen } from "@/components/HomeScreen";
import { TOTAL_MEMO_COUNT, memos } from "@/lib/memos";

// 오늘 날짜는 요청할 때마다 새로 계산한다 (예: 10월 30일 금요일)
async function Today() {
  await connection();
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
    timeZone: "Asia/Seoul",
  }).format(new Date());
}

export default function Home() {
  return (
    <HomeScreen
      today={
        <Suspense fallback={" "}>
          <Today />
        </Suspense>
      }
      totalCount={TOTAL_MEMO_COUNT}
      memos={memos}
    />
  );
}

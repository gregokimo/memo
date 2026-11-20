// 날짜 글자. 모두 한국 시간 기준.

const TIME_ZONE = "Asia/Seoul";

const dayKey = (date: Date) => date.toLocaleDateString("ko-KR", { timeZone: TIME_ZONE });

/** 홈 머리글: "11월 20일 금요일" */
export function formatToday(now = new Date()) {
  return now.toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "long", timeZone: TIME_ZONE });
}

/** 홈 목록: 오늘, 어제, 그 전은 "10월 28일" */
export function relativeDate(iso: string, now = new Date()) {
  const date = new Date(iso);
  if (dayKey(date) === dayKey(now)) return "오늘";
  if (dayKey(date) === dayKey(new Date(now.getTime() - 86_400_000))) return "어제";
  return date.toLocaleDateString("ko-KR", { month: "long", day: "numeric", timeZone: TIME_ZONE });
}

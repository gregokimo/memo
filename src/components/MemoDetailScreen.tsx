"use client";

import { useState } from "react";
import { Badge } from "./Badge";
import { ButtonPrimary } from "./ButtonPrimary";
import { IconButton } from "./IconButton";
import { ChevronLeftIcon, MoreIcon, PinIcon, ShareIcon } from "./icons";
import { MemoBody } from "./MemoBody";
import type { Memo } from "@/lib/memos";

// Figma: Mobile/Detail (2015:270)

const createdAtFormat = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Seoul",
});

export function MemoDetailScreen({ memo }: { memo: Memo }) {
  // 저장소가 생기기 전까지 고정 여부는 이 화면 안에서만 바뀐다
  const [pinned, setPinned] = useState(memo.pinned);

  async function share() {
    const data = { title: memo.title, text: memo.preview, url: location.href };
    if (navigator.share) {
      await navigator.share(data).catch(() => {});
    } else {
      await navigator.clipboard?.writeText(location.href);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col gap-16 bg-surface-page px-16 pt-48 pb-34">
      <nav className="flex items-center justify-between">
        <IconButton label="뒤로 가기" href="/">
          <ChevronLeftIcon size={24} />
        </IconButton>
        <div className="flex">
          <IconButton label={pinned ? "고정 풀기" : "고정하기"} pressed={pinned} onClick={() => setPinned(!pinned)}>
            <PinIcon size={24} />
          </IconButton>
          <IconButton label="공유하기" onClick={share}>
            <ShareIcon size={24} />
          </IconButton>
          <IconButton label="더보기">
            <MoreIcon size={24} />
          </IconButton>
        </div>
      </nav>

      <main className="flex flex-1 flex-col">
        <article className="flex flex-col gap-12 rounded-xl bg-surface-card px-20 py-24">
          <div className="flex items-center gap-8">
            <Badge label={memo.category} color={memo.label} />
            <time dateTime={memo.createdAt} className="text-caption-sm whitespace-nowrap text-text-muted">
              {createdAtFormat.format(new Date(memo.createdAt))}
            </time>
          </div>
          <h1 className="text-heading-lg text-text-primary">{memo.title}</h1>
          <hr className="border-border-default" />
          <MemoBody blocks={memo.body} />
        </article>
      </main>

      <ButtonPrimary label="수정하기" className="sticky bottom-34" />
    </div>
  );
}

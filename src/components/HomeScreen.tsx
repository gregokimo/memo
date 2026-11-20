"use client";

import { useState, type ReactNode } from "react";
import { ButtonPrimary } from "./ButtonPrimary";
import { CardHeader } from "./CardHeader";
import { Chip } from "./Chip";
import { MemoItem } from "./MemoItem";
import { CATEGORIES, type Category, type Memo } from "@/lib/memos";

// Figma: Mobile/Home (2013:390)

/** 홈 목록에 보이는 날짜(오늘, 어제, 10월 28일)를 붙인 메모 */
export type HomeMemo = Memo & { date: string };

type HomeScreenProps = {
  today: ReactNode;
  memos: HomeMemo[];
};

export function HomeScreen({ today, memos }: HomeScreenProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const visible = category ? memos.filter((memo) => memo.category === category) : memos;
  const pinned = visible.filter((memo) => memo.pinned);
  const recent = visible.filter((memo) => !memo.pinned);

  return (
    <div className="flex min-h-dvh flex-col gap-16 bg-surface-page px-16 pt-64 pb-34">
      <main className="flex flex-1 flex-col gap-16">
        <header className="flex flex-col gap-8 px-8">
          <p className="text-caption-md text-text-muted">{today}</p>
          <h1 className="text-heading-xl text-text-primary">
            오늘까지 메모를
            <br />
            <span className="text-primary">{memos.length}개</span> 남겼어요
          </h1>
        </header>

        <nav aria-label="분류" className="flex gap-8 overflow-x-auto px-4 [scrollbar-width:none]">
          <Chip label="전체" selected={category === null} onClick={() => setCategory(null)} />
          {CATEGORIES.map((name) => (
            <Chip key={name} label={name} selected={category === name} onClick={() => setCategory(name)} />
          ))}
        </nav>

        {pinned.length > 0 && (
          <section className="flex flex-col overflow-clip rounded-xl bg-surface-card py-8">
            <CardHeader title="고정한 메모" pin />
            {pinned.map((memo) => (
              <MemoItem key={memo.id} href={`/memos/${memo.id}`} {...memo} />
            ))}
          </section>
        )}

        {recent.length > 0 && (
          <section className="flex flex-col overflow-clip rounded-xl bg-surface-card py-8">
            <CardHeader title="최근 메모" actionHref="/memos" />
            {recent.map((memo) => (
              <MemoItem key={memo.id} href={`/memos/${memo.id}`} {...memo} />
            ))}
          </section>
        )}
      </main>

      <ButtonPrimary label="새 메모 쓰기" icon href="/memos/new" className="sticky bottom-34" />
    </div>
  );
}


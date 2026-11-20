import Link from "next/link";
import { NoteIcon } from "./icons";
import { labelColor, type MemoLabel } from "./labelColor";

// Figma: Memo/Item — 미리보기는 1줄, 넘치면 말줄임. 왼쪽 칸 색은 메모의 색 라벨. 누르면 메모 상세로 이동.

type MemoItemProps = {
  href: string;
  title: string;
  preview: string;
  date: string;
  label: MemoLabel;
};

export function MemoItem({ href, title, preview, date, label }: MemoItemProps) {
  return (
    <Link href={href} className="flex w-full items-center gap-16 px-20 py-12">
      <span className={`flex size-size-44 shrink-0 items-center justify-center rounded-sm ${labelColor[label]}`}>
        <NoteIcon size={22} className="shrink-0" />
      </span>
      <span className="flex flex-1 overflow-hidden flex-col gap-4">
        <span className="text-title-md text-text-primary">{title}</span>
        <span className="truncate text-body-sm text-text-secondary">{preview}</span>
      </span>
      <span className="shrink-0 text-caption-sm whitespace-nowrap text-text-muted">{date}</span>
    </Link>
  );
}

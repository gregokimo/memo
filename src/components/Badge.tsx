import { labelColor, type MemoLabel } from "./labelColor";

// Figma: Badge — 메모의 분류 배지. 색은 메모의 색 라벨을 따른다.

type BadgeProps = {
  label: string;
  color: MemoLabel;
};

export function Badge({ label, color }: BadgeProps) {
  return (
    <span className={`flex shrink-0 items-center rounded-full px-8 py-4 text-caption-sm whitespace-nowrap ${labelColor[color]}`}>
      {label}
    </span>
  );
}

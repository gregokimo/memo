import { labelFill, type MemoLabel } from "./labelColor";

// Figma: Label/Dot — 색 라벨 고르기. 고른 색은 바깥에 파란 테두리(border/focus)가 생긴다.

type LabelDotProps = {
  color: MemoLabel;
  name: string;
  selected: boolean;
  onSelect: () => void;
};

export function LabelDot({ color, name, selected, onSelect }: LabelDotProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={name}
      onClick={onSelect}
      className={`flex size-size-32 shrink-0 items-center justify-center rounded-full ${selected ? "focus-ring" : ""}`}
    >
      <span className={`size-size-22 rounded-full ${labelFill[color]}`} />
    </button>
  );
}

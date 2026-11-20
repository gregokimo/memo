// Figma: Chip — 분류 칩. 누르면 그 분류의 메모만 보인다. 고른 칩은 State=Selected.

type ChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex h-size-36 shrink-0 items-center rounded-full px-16 text-label-md whitespace-nowrap ${
        selected ? "bg-primary text-text-on-primary" : "bg-surface-card text-text-secondary"
      }`}
    >
      {label}
    </button>
  );
}

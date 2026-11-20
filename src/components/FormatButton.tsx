// Figma: Button/Format — 서식 버튼. 커서가 있는 글자의 서식은 Active로 보인다.

type FormatButtonProps = {
  label: string;
  title: string;
  active: boolean;
  onPress: () => void;
};

export function FormatButton({ label, title, active, onPress }: FormatButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-pressed={active}
      // 누를 때 편집기의 선택 영역이 풀리지 않게 한다
      onMouseDown={(e) => e.preventDefault()}
      onClick={onPress}
      className={`flex h-size-36 shrink-0 items-center justify-center rounded-sm px-12 text-label-md whitespace-nowrap ${
        active ? "bg-label-blue-soft text-primary" : "text-text-secondary"
      }`}
    >
      {label}
    </button>
  );
}

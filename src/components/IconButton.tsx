import Link from "next/link";
import type { ReactNode } from "react";

// Figma: Button/Icon — 40×40 누르는 영역 가운데에 아이콘을 둔다.
// href를 주면 다른 화면으로 가는 링크, 아니면 버튼이 된다.

type IconButtonProps = {
  label: string;
  children: ReactNode;
  href?: string;
  pressed?: boolean;
  onClick?: () => void;
};

const base = "flex size-size-40 shrink-0 items-center justify-center rounded-sm text-text-primary";

export function IconButton({ label, children, href, pressed, onClick }: IconButtonProps) {
  if (href) {
    return (
      <Link href={href} aria-label={label} className={base}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" aria-label={label} aria-pressed={pressed} onClick={onClick} className={base}>
      {children}
    </button>
  );
}

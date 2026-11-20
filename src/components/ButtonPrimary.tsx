import Link from "next/link";
import { PlusIcon } from "./icons";

// Figma: Button/Primary — 화면의 주 버튼. 화면마다 하나, 아래쪽에 가로로 꽉 차게.
// 스크롤돼도 화면 아래에 붙는 위치는 쓰는 쪽(화면)에서 정한다.
// href를 주면 다른 화면으로 가는 링크, 아니면 버튼이 된다.

type ButtonPrimaryProps = {
  label: string;
  icon?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
};

export function ButtonPrimary({ label, icon = false, className = "", href, onClick }: ButtonPrimaryProps) {
  const style = `flex w-full items-center justify-center gap-8 rounded-md bg-primary px-24 py-16 text-button-md text-text-on-primary ${className}`;
  const content = (
    <>
      {icon && <PlusIcon size={20} className="shrink-0" />}
      {label}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={style}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={style}>
      {content}
    </button>
  );
}

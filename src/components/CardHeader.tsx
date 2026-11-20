import Link from "next/link";
import { ChevronRightIcon, PinIcon } from "./icons";

// Figma: Card/Header — pin을 켜면 고정한 메모 표시, action을 켜면 오른쪽에 전체 보기(Button/Text).

type CardHeaderProps = {
  title: string;
  pin?: boolean;
  actionHref?: string;
};

export function CardHeader({ title, pin = false, actionHref }: CardHeaderProps) {
  return (
    <div className="flex h-size-40 w-full items-center gap-4 pt-12 pb-4 pl-20 pr-16">
      {pin && <PinIcon size={16} className="shrink-0 text-primary" />}
      <h2 className="flex-1 overflow-hidden text-label-md text-text-primary">{title}</h2>
      {actionHref && (
        <Link href={actionHref} className="flex shrink-0 items-center gap-4 text-caption-md whitespace-nowrap text-text-muted">
          전체 보기
          <ChevronRightIcon size={16} className="shrink-0" />
        </Link>
      )}
    </div>
  );
}

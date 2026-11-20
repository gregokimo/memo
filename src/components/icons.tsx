// Figma 아이콘(Icon/*)을 옮긴 선 아이콘. 모두 원본 24px 그림이고,
// 쓰는 곳에서 size(크기 토큰 size/16·20·22·24)로 줄인다.
// 색은 currentColor라서 글자색(text-*)을 따른다.

type IconSize = 16 | 20 | 22 | 24;

type IconProps = { size: IconSize; className?: string };

function Svg({ size, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function NoteIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 4H14L18 8V20H7V4Z" />
      <path d="M14 4V8H18M10 12H15M10 16H15" />
    </Svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 3.5H15L14.1 8.7L17 12H7L9.9 8.7L9 3.5Z" />
      <path d="M12 12V20" />
    </Svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5V19M5 12H19" />
    </Svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 6L15 12L9 18" />
    </Svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M15 18L9 12L15 6" />
    </Svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4V15M16 8L12 4L8 8M5 14V18C5 18.5304 5.21071 19.0391 5.58579 19.4142C5.96086 19.7893 6.46957 20 7 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V14" />
    </Svg>
  );
}

export function MoreIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g fill="currentColor" stroke="none">
        <circle cx="5.5" cy="12" r="1.6" />
        <circle cx="12" cy="12" r="1.6" />
        <circle cx="18.5" cy="12" r="1.6" />
      </g>
    </Svg>
  );
}

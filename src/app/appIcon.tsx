import { ImageResponse } from "next/og";
import { tokens } from "@/lib/tokens";

// 앱 아이콘: color/primary 바탕에 text/on-primary 색 메모 아이콘(Icon/Note).
// 바탕은 꽉 채우고 그림은 가운데에 둬서, 휴대폰이 원·둥근 사각형으로 잘라도 그림이 잘리지 않는다.

const GLYPH_RATIO = 0.6; // 아이콘 한 변 대비 메모 그림(24px 원본 칸)의 크기

export function renderAppIcon(size: number) {
  const glyph = Math.round(size * GLYPH_RATIO);
  const { "color/primary": background, "text/on-primary": foreground } = tokens.light;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background,
        }}
      >
        <svg
          width={glyph}
          height={glyph}
          viewBox="0 0 24 24"
          fill="none"
          stroke={foreground}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 4H14L18 8V20H7V4Z" />
          <path d="M14 4V8H18M10 12H15M10 16H15" />
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}

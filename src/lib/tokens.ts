// CSS 변수를 쓸 수 없는 곳(앱 아이콘 그림, manifest, 브라우저 테마 색)에서 쓰는 디자인 토큰 값.
// 이름과 값은 CLAUDE.md, globals.css와 같아야 한다.

export const tokens = {
  light: {
    "color/primary": "#3182F6",
    "surface/page": "#F2F4F6",
    "text/on-primary": "#FFFFFF",
  },
  dark: {
    "surface/page": "#101014",
  },
} as const;

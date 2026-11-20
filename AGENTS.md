<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

## 디자인 토큰

### 색 (Colors)

| 이름 | Light | Dark |
|---|---|---|
| `color/primary` | #3182F6 | #4D94FF |
| `surface/page` | #F2F4F6 | #101014 |
| `surface/card` | #FFFFFF | #1C1C22 |
| `text/primary` | #191F28 | #F1F3F5 |
| `text/secondary` | #4E5968 | #B3BAC2 |
| `text/muted` | #8B95A1 | #6E7783 |
| `text/on-primary` | #FFFFFF | #FFFFFF |
| `border/default` | #E5E8EB | #2A2A33 |
| `label/blue` | #3182F6 | #6AA6FF |
| `label/blue-soft` | #E8F3FF | #1D2A40 |
| `label/green` | #12A150 | #3CCB7F |
| `label/green-soft` | #E3F8EC | #17302A |
| `label/orange` | #F76808 | #FF9446 |
| `label/orange-soft` | #FFF1E5 | #3A2817 |
| `label/pink` | #E5397A | #FF6FA2 |
| `label/pink-soft` | #FFEAF1 | #3B1D2A |

### 간격 (Spacing)

| 이름 | 값 |
|---|---|
| `space/4` | 4px |
| `space/8` | 8px |
| `space/12` | 12px |
| `space/16` | 16px |
| `space/20` | 20px |
| `space/24` | 24px |
| `space/34` | 34px |
| `space/48` | 48px |
| `space/64` | 64px |

### 모서리 (Radius)

| 이름 | 값 |
|---|---|
| `radius/sm` | 12px |
| `radius/md` | 16px |
| `radius/lg` | 20px |
| `radius/xl` | 24px |
| `radius/full` | 999px |

### 텍스트 스타일 (Noto Sans KR)

| 이름 | 굵기 | 크기 | 줄 높이 | 자간 |
|---|---|---|---|---|
| `heading/xl` | Bold 700 | 28px | 38px | -0.8px |
| `heading/lg` | Bold 700 | 26px | 36px | -0.8px |
| `title/lg` | Bold 700 | 20px | 28px | -0.4px |
| `title/md` | Bold 700 | 17px | 24px | -0.3px |
| `label/md` | Bold 700 | 15px | 22px | -0.2px |
| `body/md` | Regular 400 | 16px | 28px | -0.2px |
| `body/sm` | Regular 400 | 14px | 20px | -0.1px |
| `caption/md` | Medium 500 | 15px | 22px | -0.2px |
| `caption/sm` | Medium 500 | 13px | 18px | 0 |
| `button/md` | Bold 700 | 17px | 24px | -0.2px |

## 디자인 규칙
- 디자인 토큰에 없는 값은 쓰지 않는다. 필요하면 먼저 물어본다
- 코드에서는 디자인 토큰 이름만 쓰고, 아이콘 색은 글자색을 따른다
- 같은 모양의 UI는 기존 컴포넌트를 재사용한다
- 한글은 Noto Sans KR로 쓰고, 단어 중간에서 줄을 바꾸지
않는다
<!-- END:nextjs-agent-rules -->

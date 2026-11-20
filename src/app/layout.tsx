import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { tokens } from "@/lib/tokens";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "메모",
  description: "메모 앱",
  applicationName: "메모",
  // 아이폰에서 홈 화면에 추가하면 주소창 없이 앱처럼 열린다
  appleWebApp: {
    capable: true,
    title: "메모",
    statusBarStyle: "default",
  },
};

// 상태 표시줄·주소창 색을 화면 바탕(surface/page)에 맞춘다
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: tokens.light["surface/page"] },
    { media: "(prefers-color-scheme: dark)", color: tokens.dark["surface/page"] },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

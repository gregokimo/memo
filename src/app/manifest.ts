import type { MetadataRoute } from "next";
import { tokens } from "@/lib/tokens";

// 홈 화면에 추가했을 때 앱처럼 열리게 하는 설정
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "메모",
    short_name: "메모",
    description: "메모 앱",
    lang: "ko",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: tokens.light["surface/page"],
    theme_color: tokens.light["surface/page"],
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

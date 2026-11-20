import { renderAppIcon } from "./appIcon";

// 브라우저 탭과 홈 화면(안드로이드)용 아이콘. 주소는 /icon/192, /icon/512
export function generateImageMetadata() {
  return [192, 512].map((size) => ({
    id: String(size),
    size: { width: size, height: size },
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  return renderAppIcon(Number(await id));
}

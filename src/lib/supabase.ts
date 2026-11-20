import { createClient } from "@supabase/supabase-js";

// Supabase 접속. 주소와 공개 키는 .env.local에 둔다.
// 교육용이라 로그인 없이 공개 키로 누구나 읽고 쓴다 (memos 표의 RLS 정책 참고).

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    ".env.local에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY를 넣어 주세요.",
  );
}

export const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

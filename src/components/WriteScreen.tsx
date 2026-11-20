"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { ButtonPrimary } from "./ButtonPrimary";
import { Chip } from "./Chip";
import { IconButton } from "./IconButton";
import { ChevronLeftIcon } from "./icons";
import { InputField } from "./InputField";
import { LabelDot } from "./LabelDot";
import { LABELS } from "./labelColor";
import { MemoEditor } from "./MemoEditor";
import { createMemo } from "@/lib/memoApi";
import { loadDraft, saveDraft, type Draft } from "@/lib/memoStore";
import { CATEGORIES } from "@/lib/memos";
import { blocksToPreview, htmlToBlocks } from "@/lib/richText";

// Figma: Write (39:444)

const EMPTY_DRAFT: Draft = { title: "", category: "업무", label: "blue", html: "" };
const AUTOSAVE_DELAY = 500;

const noop = () => () => {};

export function WriteScreen() {
  // 초안은 이 브라우저에만 있어서, 화면이 브라우저에 붙은 뒤에 불러온다
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  return <WriteForm key={mounted ? "client" : "server"} restoreDraft={mounted} />;
}

function WriteForm({ restoreDraft }: { restoreDraft: boolean }) {
  const router = useRouter();
  const [initial] = useState(() => (restoreDraft ? loadDraft() : null));
  const [draft, setDraft] = useState<Draft>(initial ?? EMPTY_DRAFT);
  const [autoSaved, setAutoSaved] = useState(initial !== null);
  const titleRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const saving = useRef(false);

  function update(patch: Partial<Draft>) {
    const next = { ...draft, ...patch };
    setDraft(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      saveDraft(next);
      setAutoSaved(true);
    }, AUTOSAVE_DELAY);
  }

  async function save() {
    const title = draft.title.trim();
    if (!title) {
      titleRef.current?.focus();
      return;
    }
    if (saving.current) return; // 두 번 눌러도 한 번만 저장한다
    saving.current = true;

    const root = document.createElement("div");
    root.innerHTML = draft.html;
    const body = htmlToBlocks(root);

    try {
      await createMemo({ title, preview: blocksToPreview(body), body, category: draft.category, label: draft.label });
    } catch (error) {
      saving.current = false;
      // 저장하지 못하면 쓰던 내용(초안)은 그대로 두고 알린다
      alert(error instanceof Error ? error.message : "메모를 저장하지 못했어요.");
      return;
    }
    clearTimeout(timer.current);
    saveDraft(null);
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-dvh flex-col gap-16 bg-surface-page px-16 pt-48 pb-34">
      <nav className="flex items-center justify-between">
        <IconButton label="뒤로 가기" href="/">
          <ChevronLeftIcon size={24} />
        </IconButton>
        {autoSaved && (
          <p role="status" className="text-caption-sm whitespace-nowrap text-text-muted">
            자동 저장됨
          </p>
        )}
      </nav>

      <main className="flex flex-1 flex-col gap-12">
        <InputField
          ref={titleRef}
          label="제목"
          placeholder="제목을 입력하세요"
          value={draft.title}
          onChange={(title) => update({ title })}
        />

        <div className="flex flex-col gap-12 px-8 py-4">
          <div role="radiogroup" aria-label="분류" className="flex items-center gap-8">
            <span className="text-caption-sm whitespace-nowrap text-text-muted">분류</span>
            {CATEGORIES.map((name) => (
              <Chip key={name} label={name} selected={draft.category === name} onClick={() => update({ category: name })} />
            ))}
          </div>
          <div role="radiogroup" aria-label="색" className="flex items-center gap-8">
            <span className="text-caption-sm whitespace-nowrap text-text-muted">색</span>
            {LABELS.map(({ value, name }) => (
              <LabelDot
                key={value}
                color={value}
                name={name}
                selected={draft.label === value}
                onSelect={() => update({ label: value })}
              />
            ))}
          </div>
        </div>

        <MemoEditor initialHtml={draft.html} placeholder="내용을 입력하세요" onChange={(html) => update({ html })} />
      </main>

      <ButtonPrimary label="저장하기" className="sticky bottom-34" onClick={save} />
    </div>
  );
}

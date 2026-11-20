"use client";

import { useEffect, useRef, useState } from "react";
import { FormatButton } from "./FormatButton";
import { flattenBlocks } from "@/lib/richText";

// Figma: Editor — 서식 막대(Editor/Toolbar) + 본문.
// 굵게(B), 제목(대제목), 소제목, 목록을 쓸 수 있고, 저장하면 서식도 함께 저장된다.

type Format = { bold: boolean; block: "h2" | "h3" | "li" | null };

const EMPTY_HTML = "<p><br></p>";

type MemoEditorProps = {
  initialHtml: string;
  placeholder: string;
  onChange: (html: string) => void;
};

export function MemoEditor({ initialHtml, placeholder, onChange }: MemoEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [format, setFormat] = useState<Format>({ bold: false, block: null });
  const [empty, setEmpty] = useState(() => isEmptyHtml(initialHtml));

  useEffect(() => {
    const editor = editorRef.current!;
    editor.innerHTML = initialHtml || EMPTY_HTML;
    flattenBlocks(editor);
    document.execCommand("defaultParagraphSeparator", false, "p");

    // 커서가 있는 글자의 서식을 서식 막대에 보여 준다
    const onSelection = () => {
      const node = document.getSelection()?.anchorNode;
      if (!node || !editor.contains(node)) return;
      let block: Format["block"] = null;
      for (let el = node instanceof Element ? node : node.parentElement; el && el !== editor; el = el.parentElement) {
        const tag = el.tagName.toLowerCase();
        if (tag === "h2" || tag === "h3" || tag === "li") {
          block = tag;
          break;
        }
      }
      setFormat({ bold: document.queryCommandState("bold"), block });
    };
    document.addEventListener("selectionchange", onSelection);
    return () => document.removeEventListener("selectionchange", onSelection);
    // 처음 한 번만 채운다. 그 뒤로는 사용자가 고친 내용을 그대로 둔다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changed() {
    const editor = editorRef.current!;
    // 겹친 블록을 풀되, 커서는 같은 글자 위치에 되돌려 놓는다
    const selection = document.getSelection();
    const anchor = selection?.anchorNode;
    const offset = selection?.anchorOffset ?? 0;
    if (flattenBlocks(editor) && anchor?.isConnected) selection?.collapse(anchor, offset);
    // 다 지우면 문단 하나를 남겨 다음 글자도 문단으로 들어가게 한다
    if (!editor.firstElementChild) editor.innerHTML = EMPTY_HTML;
    setEmpty(isEmptyHtml(editor.innerHTML));
    onChange(editor.innerHTML);
  }

  function run(command: () => void) {
    editorRef.current!.focus();
    command();
    document.dispatchEvent(new Event("selectionchange"));
    changed();
  }

  const toggleBlock = (tag: "h2" | "h3") =>
    run(() => document.execCommand("formatBlock", false, format.block === tag ? "p" : tag));

  return (
    <div className="flex flex-col overflow-clip rounded-lg bg-surface-card focus-within:focus-ring">
      <div role="toolbar" aria-label="서식" className="flex items-center gap-4 px-12 py-8">
        <FormatButton label="B" title="굵게" active={format.bold} onPress={() => run(() => document.execCommand("bold"))} />
        <FormatButton label="제목" title="제목" active={format.block === "h2"} onPress={() => toggleBlock("h2")} />
        <FormatButton label="소제목" title="소제목" active={format.block === "h3"} onPress={() => toggleBlock("h3")} />
        <FormatButton
          label="목록"
          title="목록"
          active={format.block === "li"}
          onPress={() => run(() => document.execCommand("insertUnorderedList"))}
        />
      </div>
      <hr className="border-border-default" />
      <div className="relative px-20 py-16">
        {empty && (
          <p aria-hidden="true" className="pointer-events-none absolute text-body-md text-text-muted">
            {placeholder}
          </p>
        )}
        <div
          ref={editorRef}
          role="textbox"
          aria-multiline="true"
          aria-label="본문"
          contentEditable
          suppressContentEditableWarning
          onInput={changed}
          className="flex flex-col gap-8 text-body-md text-text-secondary outline-none [&_b]:text-text-primary [&_h2]:text-title-lg [&_h2]:text-text-primary [&_h3]:text-title-md [&_h3]:text-text-primary [&_li]:before:mr-8 [&_li]:before:content-['•'] [&_strong]:text-text-primary [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-4"
        />
      </div>
    </div>
  );
}

// 서버에서도 돌 수 있게 DOM 없이 글자가 있는지 본다
function isEmptyHtml(html: string) {
  if (/<li[\s>]/i.test(html)) return false;
  return !html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim();
}

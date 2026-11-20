import type { MemoBlock, RichText } from "./memos";

// 편집기(HTML) → 메모 본문(MemoBlock[]) 변환

function pushText(out: RichText, text: string, bold: boolean) {
  if (!text) return;
  const last = out[out.length - 1];
  if (bold) {
    if (last && typeof last !== "string") last.strong += text;
    else out.push({ strong: text });
  } else if (typeof last === "string") {
    out[out.length - 1] = last + text;
  } else {
    out.push(text);
  }
}

function isBold(el: HTMLElement) {
  if (el.tagName === "B" || el.tagName === "STRONG") return true;
  const weight = el.style.fontWeight;
  return weight === "bold" || Number(weight) >= 600;
}

function inline(node: Node, bold = false, out: RichText = []): RichText {
  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      pushText(out, child.textContent ?? "", bold);
    } else if (child instanceof HTMLElement && child.tagName !== "BR") {
      inline(child, bold || isBold(child), out);
    }
  });
  return out;
}

function hasText(content: RichText) {
  return content.some((part) => (typeof part === "string" ? part : part.strong).trim());
}

const BLOCK_TAGS = new Set(["P", "DIV", "UL", "OL", "H1", "H2", "H3", "H4", "H5", "H6"]);

function isBlock(node: Node): node is HTMLElement {
  return node instanceof HTMLElement && BLOCK_TAGS.has(node.tagName);
}

/**
 * 문단(P, DIV) 안에 목록·제목 같은 블록이 들어가 있으면 풀어서 같은 줄에 늘어놓는다.
 * 브라우저 편집 명령이 가끔 <p><ul>…</ul></p>처럼 겹쳐 만들기 때문이다.
 * 바꾼 것이 있으면 true.
 */
export function flattenBlocks(root: HTMLElement): boolean {
  let changed = false;
  // 풀고 남은 빈 껍데기(<p></p>)는 지운다. 빈 줄(<p><br></p>)은 사용자가 만든 것이라 둔다
  for (const shell of Array.from(root.querySelectorAll("p:empty, div:empty"))) {
    shell.remove();
    changed = true;
  }
  for (;;) {
    const wrapper = Array.from(root.querySelectorAll("p, div")).find((el) =>
      Array.from(el.childNodes).some(isBlock),
    );
    if (!wrapper) return changed;
    let run: HTMLParagraphElement | null = null;
    for (const child of Array.from(wrapper.childNodes)) {
      if (isBlock(child)) {
        run = null;
        wrapper.before(child);
      } else {
        if (!run) {
          run = document.createElement("p");
          wrapper.before(run);
        }
        run.append(child);
      }
    }
    wrapper.remove();
    changed = true;
  }
}

function collect(root: Node, blocks: MemoBlock[]) {
  let run: RichText = [];
  const endRun = () => {
    if (hasText(run)) blocks.push({ type: "paragraph", content: run });
    run = [];
  };
  root.childNodes.forEach((node) => {
    if (!isBlock(node)) {
      // 블록 밖에 놓인 글자는 문단으로 모은다
      if (node.nodeType === Node.TEXT_NODE) pushText(run, node.textContent ?? "", false);
      else if (node instanceof HTMLElement && node.tagName !== "BR") inline(node, isBold(node), run);
      return;
    }
    endRun();
    const text = node.textContent?.trim() ?? "";
    switch (node.tagName) {
      case "H1":
      case "H2":
        if (text) blocks.push({ type: "heading", text });
        break;
      case "H3":
      case "H4":
      case "H5":
      case "H6":
        if (text) blocks.push({ type: "subheading", text });
        break;
      case "UL":
      case "OL": {
        const items = Array.from(node.querySelectorAll("li"))
          .map((li) => inline(li))
          .filter(hasText);
        if (items.length) blocks.push({ type: "list", items });
        break;
      }
      default:
        collect(node, blocks); // P, DIV — 안에 블록이 겹쳐 있어도 풀어서 읽는다
    }
  });
  endRun();
}

export function htmlToBlocks(root: HTMLElement): MemoBlock[] {
  const blocks: MemoBlock[] = [];
  collect(root, blocks);
  return blocks;
}

function plain(content: string | RichText) {
  if (typeof content === "string") return content;
  return content.map((part) => (typeof part === "string" ? part : part.strong)).join("");
}

/** 홈 목록의 한 줄 미리보기 */
export function blocksToPreview(blocks: MemoBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "list") return block.items.map(plain).join(", ");
      if (block.type === "paragraph") return plain(block.content);
      return block.text;
    })
    .join(" ");
}

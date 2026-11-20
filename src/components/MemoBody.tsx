import type { MemoBlock, RichText } from "@/lib/memos";

// 메모 본문. 소제목(title/lg, title/md), 문단(body/md), 목록(Figma: Memo/ListItem)으로 이루어진다.

function Rich({ content }: { content: string | RichText }) {
  if (typeof content === "string") return content;
  return content.map((part, i) =>
    typeof part === "string" ? (
      part
    ) : (
      <strong key={i} className="text-text-primary">
        {part.strong}
      </strong>
    ),
  );
}

export function MemoBody({ blocks }: { blocks: MemoBlock[] }) {
  return (
    <div className="flex flex-col gap-12">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2 key={i} className="text-title-lg text-text-primary">
                {block.text}
              </h2>
            );
          case "subheading":
            return (
              <h3 key={i} className="text-title-md text-text-primary">
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={i} className="text-body-md text-text-secondary">
                <Rich content={block.content} />
              </p>
            );
          case "list":
            return (
              <ul key={i} className="flex flex-col gap-4">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-8 text-body-md text-text-secondary">
                    <span aria-hidden="true">•</span>
                    <span className="flex-1 overflow-hidden">
                      <Rich content={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
        }
      })}
    </div>
  );
}

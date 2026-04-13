export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Extrai todos os h2 e h3 do HTML do post para montar o índice. */
export function extractHeadings(html: string): TocItem[] {
  const regex = /<h([23])[^>]*>([\s\S]*?)<\/h[23]>/gi;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const level = Number(match[1]) as 2 | 3;
    const rawText = match[2].replace(/<[^>]+>/g, "").trim();
    if (rawText) items.push({ id: slugify(rawText), text: rawText, level });
  }
  return items;
}

/** Injeta atributos `id` nos h2/h3 do HTML para ancoragem. */
export function injectHeadingIds(html: string): string {
  return html.replace(
    /<h([23])([^>]*?)>([\s\S]*?)<\/h[23]>/gi,
    (_, level, attrs: string, content: string) => {
      if (attrs.includes("id=")) return `<h${level}${attrs}>${content}</h${level}>`;
      const text = content.replace(/<[^>]+>/g, "").trim();
      const id = slugify(text);
      return `<h${level} id="${id}"${attrs}>${content}</h${level}>`;
    }
  );
}

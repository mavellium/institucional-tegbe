import { RichTextItem } from "./richText.type";


export type RichBlock =
  | { type: "paragraph"; className?: string; content: RichTextItem[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4; size?: "sm" | "md" | "lg" | "xl"; className?: string; content: RichTextItem[] }
  | { type: "list"; items: RichTextItem[][], ordered?: boolean;}
  | { type: "image"; src: string; alt?: string }
  | { type: "quote"; content: RichTextItem[]; author?: string }
  | { type: "grid"; columns: number; items: RichBlock[] }
  | { type: "card"; title: RichTextItem[]; text: RichTextItem[] };
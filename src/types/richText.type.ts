import { HighlightColor } from "@/components/ui/highlight";
import { HeadingFont } from "./formatacaoText.type";

export type RichTextItem =
  | { type: "text"; value: string, font?: HeadingFont, size?: number }
  | { type: "bold"; value: string, size?: number }
  | { type: "highlight"; value: string, color: HighlightColor, serif?: boolean, italic?: boolean}
  | { type: "gradient"; value: string }
  | { type: "link"; value: string; href: string }
  | { type: "icon"; value: string }
  | { type: "emoji"; value: string }
  | { type: "linebreak" };
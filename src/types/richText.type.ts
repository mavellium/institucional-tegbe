
import { HeadingFont } from "./formatacaoText.type";

export type RichTextItem =
  | { type: "text"; value: string, font?: HeadingFont, size?: number, color?: string }
  | { type: "bold"; value: string, size?: number, color?: string }
  | { type: "highlight"; value: string, color: string, serif?: boolean, italic?: boolean, font?: HeadingFont}
  | { type: "gradient"; value: string }
  | { type: "link"; value: string; href: string }
  | { type: "icon"; value: string }
  | { type: "emoji"; value: string }
  | { type: "linebreak" };
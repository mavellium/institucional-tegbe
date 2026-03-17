import { IButton } from "@/interface/button/IButton";
import { RichTextItem } from "./richText.type";
import { Founder } from "./founder.type";

export type QuemSomosData = {
  header: {
    title: RichTextItem[];
    subtitle: RichTextItem[];
  };

  button?: IButton;

  founder: Founder;
};
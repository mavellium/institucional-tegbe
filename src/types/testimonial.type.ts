import { IButton } from "@/interface/button/IButton";
import { RichTextItem } from "./richText.type";
import { TextItem } from "./textType";

export interface TestimonialItem {
  id: number;
  logo: string;
  name: string;
  description: string;
  result: string;
  tags: TextItem[];
}

export interface SectionContent {
  badge: {
    text: string;
    icon: string;
  };
  title: RichTextItem[]
  testimonials: TestimonialItem[];
  button: IButton;
}
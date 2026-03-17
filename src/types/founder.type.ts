import { RichTextItem } from "./richText.type";

export type Founder = {
  name: RichTextItem[];
  role: RichTextItem[];
  image: string;

  socials: {
    icon: string;
    link: string;
  }[];

  companies: {
    logo: string;
    name: string;
  }[];
};
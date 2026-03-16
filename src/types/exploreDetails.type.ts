import { IButton } from "@/interface/button/IButton";
import { RichTextItem } from "./richText.type";

export interface ExploreDetailsHeader {
  eyebrow?: string;
  title: string;
  description?: RichTextItem[];
}

export interface ExploreDetailsFeature {
  id: string;
  title: string;
  description?: RichTextItem[];
  image: string;
  icon?: string;
  badge?: string;
}

export interface ExploreDetailsProps {
  header: ExploreDetailsHeader;
  features: ExploreDetailsFeature[];
  button?: IButton
}
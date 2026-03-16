import { RichTextItem } from "@/types/richText.type"
import { IButton } from "../button/IButton"
import { FeatureItem } from "./IFeatureItem"

export interface FeatureSectionData {
  header: {
    title: RichTextItem[]
    subtitle?: RichTextItem[]
  }
  items: FeatureItem[]
  button?: IButton
}
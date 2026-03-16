import { RichTextItem } from "@/types/richText.type"

export interface FeatureItem {
  id: string
  title: RichTextItem[]
  description: RichTextItem[]
  image: string
  icon?: string
}
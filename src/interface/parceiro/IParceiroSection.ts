import { RichTextItem } from "@/types/richText.type"
import { IParceiro } from "./IParceiro"
import { IButton } from "../button/IButton"

export interface IParceiroSection {
  badge: RichTextItem[]
  title: RichTextItem[]
  description: RichTextItem[]

  parceiros: IParceiro[]

  button: IButton
  msgFinal: string
}
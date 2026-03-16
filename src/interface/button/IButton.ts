import { ButtonSize } from "@/types/button/buttonSize.type"
import { ButtonTarget } from "@/types/button/buttonTarget.type"
import { Variant } from "@/types/button/buttonVariant.type"

interface BaseButton {
  label: string
  variant?: Variant
  size?: ButtonSize
  icon?: string
}

export interface ButtonLink extends BaseButton {
  action?: "link"
  link: string
  target?: ButtonTarget
}

export interface ButtonForm extends BaseButton {
  action: "form"
  form_html?: string
}

export type IButton = ButtonLink | ButtonForm
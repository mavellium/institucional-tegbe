import { VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/components/ui/button/button"

export type Variant = VariantProps<typeof buttonVariants>["variant"]
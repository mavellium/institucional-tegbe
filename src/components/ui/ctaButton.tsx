import { IButton } from "@/interface/button/IButton"
import { Button } from "./button/button"
import Link from "next/link"

export default function CTAButton({
  button,
  onOpenForm,
}: {
  button: IButton
  onOpenForm: () => void
}) {

  if (button.action === "form") {
    return (
      <Button
        variant={button.variant}
        // size={button.size}
        onClick={onOpenForm}
      >
        {button.label}
      </Button>
    )
  }

  return (
    <Button asChild variant={button.variant}>
      <Link href={button.link} target={button.target}>
        {button.label}
      </Link>
    </Button>
  )
}
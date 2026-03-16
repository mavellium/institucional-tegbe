"use client"

import Link from "next/link"
import { Button } from "./button"
import { IButton } from "@/interface/button/IButton"

interface CTAButtonProps {
  button: IButton
  onOpenForm?: () => void
}

export default function CTAButton({ button, onOpenForm }: CTAButtonProps) {

  const handleCTA = () => {
    if (button.action === "form" && onOpenForm) {
      onOpenForm()
    }
  }

  if (button.action === "form") {
    return (
      <Button
        variant={button.variant || "default"}
        onClick={handleCTA}
      >
        {button.label}
      </Button>
    )
  }

  return (
    <Button
      asChild
      variant={button.variant || "default"}
    >
      <Link
        href={button.link || "#"}
        target={button.target || "_self"}
      >
        {button.label}
      </Link>
    </Button>
  )
}
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#FFC72C] hover:bg-[#F2CB5E] text-black",

        marketing:
          "bg-[#F9265E] hover:bg-[#FF6D6D] text-white shadow-[0_0_20px_rgba(249,38,94,0.3)] hover:shadow-[0_0_30px_rgba(249,38,94,0.5)]",

        destructive:
          "bg-destructive text-white hover:bg-destructive/90",

        outline:
          "border bg-background hover:bg-accent",

        secondary:
          "group relative inline-flex items-center gap-3 px-10 py-5 bg-black text-white font-bold rounded-full overflow-hidden transition-all",

        ghost:
          "hover:bg-accent",

        link:
          "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "size-9",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  "aria-label"?: string
  pressed?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      pressed,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    const isSecondary = variant === "secondary"

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        aria-label={ariaLabel}
        aria-pressed={pressed}
        {...props}
      >
        {isSecondary ? (
          <>
            {/* TEXTO */}
            <span className="relative z-10">{children}</span>

            {/* BG ANIMADO */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0071E3] to-[#00a2ff] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }

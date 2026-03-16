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
          "bg-secondary hover:bg-secondary/80",

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
  ({ className, variant, size, asChild = false, children, pressed, "aria-label": ariaLabel, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Verifica se é só ícone e não tem aria-label
    React.useEffect(() => {
      const isIconButton =
        typeof children === "object" &&
        !(children && React.isValidElement<{ children?: React.ReactNode }>(children) && children.props.children)
      if (isIconButton && !ariaLabel) {
        console.warn(
          "Botão ícone detectado sem aria-label! Para acessibilidade, passe um aria-label."
        )
      }
    }, [children, ariaLabel])

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        aria-label={ariaLabel}
        aria-pressed={pressed}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }

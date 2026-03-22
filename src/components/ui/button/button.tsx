import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
          "text-primary underline-offset-4 hover:underline rounded-none h-auto px-0 py-0",
      },

      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-6",
        icon: "size-9 shrink-0",
        /** CTA hero / landing */
        pill: "h-12 min-h-12 px-6 sm:px-8 rounded-full font-bold tracking-wide",
        /** Secundário ao lado do pill */
        pillSoft:
          "h-12 min-h-12 px-6 rounded-full font-semibold",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "href">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Se definido, renderiza `Link` (interno) ou `<a>` (externo) com os estilos do botão. */
  href?: string;
  /** Força `<a>` em vez de `Link` (ex.: mailto:, ou URLs absolutas que não devem ser prefetch). */
  external?: boolean;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  pressed?: boolean;
}

function renderSecondaryChildren(children: React.ReactNode) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0071E3] to-[#00a2ff] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    </>
  );
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
      href,
      external,
      target,
      rel,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const classes = cn(buttonVariants({ variant, size, className }));
    const isSecondary = variant === "secondary";
    const content = isSecondary ? renderSecondaryChildren(children) : children;

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={classes}
          aria-label={ariaLabel}
          aria-pressed={pressed}
          {...rest}
        >
          {children}
        </Slot>
      );
    }

    if (href) {
      const trimmed = href.trim();
      const isExternal =
        external === true ||
        /^https?:\/\//i.test(trimmed) ||
        trimmed.startsWith("mailto:") ||
        trimmed.startsWith("tel:");

      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={trimmed}
            className={classes}
            target={target ?? "_blank"}
            rel={rel ?? "noopener noreferrer"}
            aria-label={ariaLabel}
            aria-pressed={pressed}
            {...(rest as React.ComponentPropsWithoutRef<"a">)}
          >
            {content}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={trimmed}
          className={classes}
          aria-label={ariaLabel}
          aria-pressed={pressed}
          {...(rest as Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        aria-label={ariaLabel}
        aria-pressed={pressed}
        {...rest}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

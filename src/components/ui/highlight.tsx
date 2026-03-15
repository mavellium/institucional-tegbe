import { cn } from "@/lib/utils";

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
  color: HighlightColor;
  withSerif?: boolean;
  withItalic?: boolean;
}

export type HighlightColor = "#FFC72C" | "#F1D95D" | "#F9265E" | "#FF0400" | "#F9396F";

export default function Highlight({
  children,
  className,
  color,
  withSerif = true,
  withItalic = true
}: HighlightProps) {
  let serif = withSerif ? "font-serif" : "";
  let italic = withItalic ? "italic" : "";

  return (
    <span
      className={cn(serif, italic, className)}
      style={{ color }}
    >
      {children}
    </span>
  );
}
import { cn } from "@/lib/utils";

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
  color: string;
  withSerif?: boolean;
  withItalic?: boolean;
}

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
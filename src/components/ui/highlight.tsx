import { cn } from "@/lib/utils";

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
  color: string;
  size?: number;
  withSerif?: boolean;
  withItalic?: boolean;
}

export default function Highlight({
  children,
  className,
  color,
  withSerif = true,
  withItalic = true,
  size,
}: HighlightProps) {
  const serif = withSerif ? "font-serif" : "";
  const italic = withItalic ? "italic" : "";

  return (
    <span className={cn(serif, italic, className)} style={{ color, fontSize: `${size}px` }}>
      {children}
    </span>
  );
}

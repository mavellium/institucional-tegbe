import { cn } from "@/lib/utils";

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
  color: HighlightColor;
}

type HighlightColor = "F1D95D" | "FFC72C"


export default function Highlight({ children, className, color = "FFC72C" }: HighlightProps) {
  return (
    <span
      className={cn(
        `text-[#${color}] font-serif italic`,
        className
      )}
    >
      {children}
    </span>
  );
}
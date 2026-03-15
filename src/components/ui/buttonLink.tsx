import { TargetVideo } from "@/app/types/target-button.types";

interface ButtonLinkProps {
  button: {
    label: string;
    link: string;
    target?: TargetVideo;
  };
  variant?: "default" | "marketing";
}

export default function ButtonLink({
  button: { label, link, target = "_self" },
  variant = "default",
}: ButtonLinkProps) {
  // Classes base
  const baseClasses = "inline-block mt-4 font-semibold px-8 py-3 rounded-lg transition";

  // Classes específicas por variant
  let colorClasses = "";
  if (variant === "default") {
    colorClasses = "bg-[#FFC72C] hover:bg-[#F2CB5E] text-black";
  } else if (variant === "marketing") {
    colorClasses = "bg-[#F9265E] hover:bg-[#FF6D6D] text-white shadow-[0_0_20px_rgba(249,38,94,0.3)] hover:shadow-[0_0_30px_rgba(249,38,94,0.5)]";
  }

  return (
    <a
      href={link}
      target={target}
      className={`${baseClasses} ${colorClasses}`}
    >
      {label}
    </a>
  );
}
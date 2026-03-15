import { TargetVideo } from "@/app/types/target-button.types";

interface ButtonLinkProps {
  button: {
    label: string;
    link: string;
    target?: TargetVideo;
  };
}

export default function ButtonLink({
  button: { label, link, target = "_self" }
}: ButtonLinkProps) {
  return (
    <a
      href={link}
      target={target}
      className="
        inline-block mt-4
        bg-[#F9265E] hover:bg-[#FF6D6D]
        text-white font-semibold
        px-8 py-3 rounded-lg
        transition-shadow duration-300
        shadow-[0_0_20px_rgba(249,38,94,0.3)]
        hover:shadow-[0_0_30px_rgba(249,38,94,0.5)]
      "
    >
      {label}
    </a>
  );
}
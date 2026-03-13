import { TargetVideo } from "@/app/types/target-button.types";

interface ButtonLinkProps {
      button: {
        label: string;
        link: string;
        target?: TargetVideo
  };
}


export default function ButtonLink({  button: { label, link, target = "_self" }  }: ButtonLinkProps){
    return <a
              href={link}
              target={target}
              className="
                inline-block
                mt-4
                bg-[#FFC72C]
                hover:bg-[#F2CB5E]
                text-black
                font-semibold
                px-8
                py-3
                rounded-lg
                transition
              "
            >
              {label}
            </a>
}
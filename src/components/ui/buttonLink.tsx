interface ButtonLinkProps {
      button: {
        label: string;
        link: string;
  };
}

export default function ButtonLink({ button }: ButtonLinkProps){
    return <a
              href={button.link}
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
              {button.label}
            </a>
}
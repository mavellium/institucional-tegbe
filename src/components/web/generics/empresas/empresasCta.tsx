import Link from "next/link";
import { Icon } from "@iconify/react";

export default function EmpresasCTA({ data, onOpenModal }: any) {

  const base =
    "bg-gradient-to-r from-[#FF0F43] to-[#E31B63] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition hover:scale-105"

  if (data.use_form) {

    return (
      <div className="flex justify-center mt-12">

        <button
          onClick={onOpenModal}
          className={`${base} flex items-center gap-2`}
        >
          {data.showIcon && <Icon icon={data.icon} />}
          {data.text}
        </button>

      </div>
    )
  }

  return (
    <div className="flex justify-center mt-12">

      <Link
        href={data.link}
        className={`${base} flex items-center gap-2`}
      >
        {data.showIcon && <Icon icon={data.icon} />}
        {data.text}
      </Link>

    </div>
  )
}
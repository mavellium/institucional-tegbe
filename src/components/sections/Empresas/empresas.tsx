"use client";

import { useRef, useState } from "react";
import { useEmpresasAnimation } from "./useEmpresasAnimation";
import EmpresasHeader from "./empresasHeader";
import EmpresasLogos from "./empresasLogos";
import EmpresasCTA from "./empresasCta";
import EmpresasModal from "./empresasModal";


interface EmpresasProps {
  data: any
}

export default function Empresas({ data }: EmpresasProps) {

  const sectionRef = useRef<HTMLElement>(null)
  const [openModal, setOpenModal] = useState(false)

  useEmpresasAnimation(sectionRef)

  if (!data) return null

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-24 px-6 bg-[#020202] border-t border-white/5 overflow-hidden"
      >
        <div className="container mx-auto max-w-7xl">

          <EmpresasHeader data={data} />

          <EmpresasLogos logos={data.logos} />

          {data.cta && (
            <EmpresasCTA
              data={data.cta}
              onOpenModal={() => setOpenModal(true)}
            />
          )}

        </div>
      </section>

      <EmpresasModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        html={data.cta?.form_html}
      />
    </>
  )
}
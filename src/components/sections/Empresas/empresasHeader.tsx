import { Icon } from "@iconify/react";

export default function EmpresasHeader({ data }: any) {

  return (
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">

      <div className="max-w-3xl">

        <div className="reveal-trust mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/20 bg-rose-950/10 backdrop-blur-md">

          <Icon icon={data.badge.icon} className="text-[#E31B63] w-4 h-4" />

          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-rose-100">
            {data.badge.text}
          </span>

        </div>

        <h2
          className="reveal-trust text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />

      </div>

      <div className="hidden md:flex flex-col items-end border-l border-white/10 pl-8">

        <span className="text-5xl font-bold text-white tracking-tighter">
          +R$50M
        </span>

        <span className="text-sm text-gray-400 uppercase tracking-widest mt-1">
          Gerenciados em Ads
        </span>

      </div>

    </div>
  )
}
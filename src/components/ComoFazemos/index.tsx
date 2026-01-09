"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const STEPS = [
  {
    id: "01",
    label: "Fundação",
    title: "Auditoria de Margem",
    icon: "solar:bill-check-bold-duotone",
    desc: "Não há criativo que salve um negócio matematicamente falido. Iniciamos auditando seu CMV, impostos e margem de contribuição. O lucro é desenhado antes da venda."
  },
  {
    id: "02",
    label: "Otimização",
    title: "Engenharia de Conversão",
    icon: "solar:programming-bold-duotone",
    desc: "Tráfego em site ruim é rasgar dinheiro. Implementamos CRO (Conversion Rate Optimization) para garantir que sua loja não seja um balde furado. Só aceleramos o que converte."
  },
  {
    id: "03",
    label: "Aceleração",
    title: "Escala com Dados",
    icon: "solar:rocket-2-bold-duotone",
    desc: "Com a casa arrumada, ativamos o tráfego de alta intenção e CRM. Saímos do 'acho que funciona' para o ROI confirmado. Aqui o jogo vira escala previsível."
  }
];

export default function MethodSectionPremium() {
  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden font-sans">
      
      {/* 1. LAYER DE AMBIÊNCIA (Técnico e Clean) */}
      <div className="absolute inset-0 pointer-events-none">
          {/* Grid de Pontos Suave */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-70" />
          
          {/* Gradient Spotlights (Luzes de Fundo) */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gray-100/60 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER: Manifesto Estratégico */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-28">
           <div className="max-w-3xl relative">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                className="h-1 bg-yellow-400 mb-6"
              />
              
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05]">
                Não fazemos mágica.<br/>
                Fazemos <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400 relative">
                    Engenharia.
                </span>
              </h2>
           </div>
           
           <div className="max-w-md text-right lg:text-left">
             <p className="text-gray-500 text-lg font-medium leading-relaxed">
               O mercado foca em "hacks" de curto prazo. Nós construímos máquinas de vendas baseadas em fundamentos econômicos que sustentam o crescimento por anos.
             </p>
           </div>
        </div>

        {/* --- A ESTEIRA (GRID DE PROCESSOS) --- */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
           
           {/* CONECTOR (LINHA DE FLUXO) - Apenas Desktop */}
           <div className="hidden md:block absolute top-[4.5rem] left-[16%] right-[16%] h-[2px] bg-gray-100 z-0">
              {/* O Feixe de Energia percorrendo a linha */}
              <motion.div 
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-yellow-300 to-transparent blur-[1px]"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
           </div>

           {STEPS.map((step, index) => (
             <StepCard key={step.id} data={step} index={index} />
           ))}

        </div>

        {/* CTA FINAL (Minimalista) */}
        <div className="mt-20 flex justify-center">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 px-8 py-4 bg-[#0A0A0A] text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-yellow-400 hover:text-black hover:shadow-xl hover:shadow-yellow-400/20 transition-all duration-300"
            >
                <span>Ver Planos de Execução</span>
                <Icon icon="solar:arrow-right-linear" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
        </div>

      </div>
    </section>
  );
}

// --- COMPONENTE DO CARD (The Blueprint Card) ---
function StepCard({ data, index }: { data: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2, ease: "circOut" }}
            viewport={{ once: true }}
            className="relative px-6 group"
        >
            {/* 1. O NÚCLEO DO ÍCONE (Centerpiece) */}
            <div className="relative flex justify-center mb-10 z-10">
                {/* Linha vertical de conexão (Mobile) */}
                <div className="md:hidden absolute top-0 bottom-[-4rem] w-[1px] bg-gray-100 -z-10" />

                <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-24 h-24 rounded-[2rem] bg-white border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex items-center justify-center relative z-20 group-hover:border-yellow-400 group-hover:shadow-[0_20px_40px_-10px_rgba(250,204,21,0.2)] transition-all duration-500"
                >
                    {/* Ícone */}
                    <Icon icon={data.icon} className="w-10 h-10 text-gray-400 group-hover:text-yellow-600 transition-colors duration-300" />
                    
                    {/* Badge de Número Flutuante */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold font-mono border-4 border-white group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                        {data.id}
                    </div>
                </motion.div>
            </div>

            {/* 2. O PAINEL DE CONTEÚDO */}
            <div className="text-center relative">
                
                {/* Label Técnica */}
                <div className="inline-block mb-3">
                    <span className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-yellow-600 group-hover:bg-yellow-50 group-hover:border-yellow-100 transition-all duration-300">
                        // {data.label}
                    </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300">
                    {data.title}
                </h3>

                <p className="text-gray-500 text-base leading-relaxed px-2 lg:px-6">
                    {data.desc}
                </p>

                {/* Efeito: Barra de Progresso 'Fake' no fundo do card */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-100 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <motion.div 
                        className="h-full bg-yellow-400"
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "0%" }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                     />
                </div>
            </div>

            {/* Divisória Vertical (Apenas visual entre cards no Desktop) */}
            {index !== 2 && (
                <div className="hidden md:block absolute right-0 top-1/4 bottom-0 w-[1px] bg-gradient-to-b from-gray-100 via-transparent to-transparent opacity-0 lg:opacity-100" />
            )}

        </motion.div>
    );
}
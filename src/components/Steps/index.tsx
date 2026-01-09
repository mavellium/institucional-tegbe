"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- DADOS ESTRATÉGICOS ---
const ROUTER_DATA = {
  header: {
    label: "Nossos Pilares",
    title: "Escolha sua Escala.",
    desc: "Não somos generalistas. Somos especialistas em três verticais de alto impacto financeiro."
  },
  services: [
    {
      id: "ecommerce",
      number: "01",
      title: "E-commerce",
      verticalTitle: "ESTRUTURA",
      icon: "solar:shop-2-bold-duotone",
      image: "/ads-bg.png", 
      description: "Sua loja validada com a segurança de uma Consultoria Oficial. Não entregamos apenas um site bonito, entregamos uma operação de vendas blindada contra falhas.",
      buttonText: "Construir Máquina",
      href: "/ecommerce",
      theme: {
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        btn: "hover:bg-amber-500"
      }
    },
    {
      id: "marketing",
      number: "02",
      title: "Growth & Ads",
      verticalTitle: "TRAÇÃO",
      icon: "solar:chart-2-bold-duotone",
      image: "/ads-bg.png",
      description: "Engenharia de tráfego e CRM avançado. Transformamos cliques anônimos em receita recorrente usando inteligência de dados proprietária.",
      buttonText: "Acelerar Vendas",
      href: "/marketing",
      theme: {
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
        btn: "hover:bg-red-600"
      }
    },
    {
      id: "cursos",
      number: "03",
      title: "Academy",
      verticalTitle: "LEGADO",
      icon: "solar:diploma-verified-bold-duotone",
      image: "/ads-bg.png",
      description: "O campo de batalha transformado em protocolo. Treine sua equipe interna com os processos exatos que usamos para gerar múltiplos 8 dígitos.",
      buttonText: "Dominar o Jogo",
      href: "/cursos",
      theme: {
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        btn: "hover:bg-blue-600"
      }
    }
  ]
};

// --- CORREÇÃO AQUI ---
// Adicionamos 'as const' para o TS entender que são valores literais
const springTransition = { 
  type: "spring", 
  stiffness: 100, 
  damping: 25, 
  mass: 1 
} as const;

export default function ServiceRouterWhite() {
  const [activeId, setActiveId] = useState<string>("ecommerce");

  return (
    <section id="solucoes" className="py-32 px-6 bg-white relative overflow-hidden font-sans">
      
      {/* Background Decorativo Suave */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-50 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-50 rounded-full blur-[80px] -z-10 -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto h-full flex flex-col">
        
        {/* HEADER EXECUTIVO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">
               {ROUTER_DATA.header.label}
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[0.95]">
              {ROUTER_DATA.header.title}
            </h2>
          </div>
          <p className="text-gray-500 text-lg md:max-w-sm leading-relaxed text-right md:text-left">
            {ROUTER_DATA.header.desc}
          </p>
        </div>

        {/* OS MONOLITOS (Cards Expansivos) */}
        <div className="flex flex-col lg:flex-row gap-6 h-[700px] lg:h-[600px] w-full">
          {ROUTER_DATA.services.map((service) => {
            const isActive = activeId === service.id;

            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => setActiveId(service.id)}
                transition={springTransition}
                className={`
                  relative rounded-[2rem] overflow-hidden cursor-pointer
                  border transition-colors duration-500
                  ${isActive ? `shadow-2xl shadow-gray-200/50 ${service.theme.border} bg-white` : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}
                `}
                style={{
                  flex: isActive ? 3 : 1, 
                }}
              >
                
                {/* 1. IMAGEM DE FUNDO */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <motion.div 
                        animate={{ opacity: isActive ? 0.08 : 0 }}
                        className="relative w-full h-full"
                    >
                        <Image 
                            src={service.image}
                            alt="Background Texture"
                            fill
                            className="object-cover grayscale"
                        />
                    </motion.div>
                </div>

                {/* 2. CONTEÚDO */}
                <div className="relative z-10 w-full h-full p-8 md:p-10 flex flex-col justify-between overflow-hidden">
                  
                  {/* TOPO: Ícone e Número */}
                  <div className="flex justify-between items-start">
                    <motion.div 
                      layout="position"
                      className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center border
                        transition-colors duration-500
                        ${isActive ? `${service.theme.bg} ${service.theme.color} border-transparent` : 'bg-white border-gray-200 text-gray-400'}
                      `}
                    >
                      <Icon icon={service.icon} className="w-7 h-7" />
                    </motion.div>

                    <span className={`text-xl font-mono font-bold transition-colors duration-500 ${isActive ? 'text-gray-200' : 'text-gray-300'}`}>
                      {service.number}
                    </span>
                  </div>

                  {/* MEIO: Títulos */}
                  <div className="flex-1 flex items-center">
                    <AnimatePresence mode="popLayout">
                      {isActive ? (
                        <motion.div 
                          key="active-content"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="max-w-lg"
                        >
                          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                            {service.title}
                          </h3>
                          <p className="text-gray-500 text-lg leading-relaxed mb-8">
                            {service.description}
                          </p>
                          
                          <Link href={service.href}>
                            <button className={`
                                group flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full 
                                font-bold uppercase tracking-wider text-sm transition-all duration-300
                                ${service.theme.btn}
                            `}>
                                {service.buttonText}
                                <Icon icon="solar:arrow-right-linear" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </Link>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="inactive-content"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                           <h3 className="hidden lg:block text-4xl font-bold text-gray-300 tracking-widest uppercase -rotate-90 whitespace-nowrap origin-center select-none">
                              {service.verticalTitle}
                           </h3>
                           
                           <h3 className="lg:hidden text-2xl font-bold text-gray-400">
                              {service.title}
                           </h3>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* RODAPÉ: Indicador */}
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mt-auto">
                     <motion.div 
                        className={`h-full ${isActive ? 'bg-gray-900' : 'bg-transparent'}`}
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? "100%" : "0%" }}
                        transition={{ duration: 0.6 }}
                     />
                  </div>

                </div>

                {!isActive && (
                    <div className="absolute inset-0 z-20 bg-transparent cursor-pointer hover:bg-black/[0.02] transition-colors" />
                )}

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
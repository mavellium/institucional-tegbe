"use client";

import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, useInView, Variants } from "framer-motion";

// --- INTERFACES ---
interface Module {
  id: string; phase: string; title: string; description: string; tags: string[]; icon: string;
}

interface ConfigData {
  theme: { accentColor: string; secondaryColor: string; };
  header: { badge: string; title: string; subtitle: string; };
  modules: Module[];
  cta: { text: string; link: string; };
}

const FALLBACK_DATA: ConfigData = {
  theme: { accentColor: "#FFD700", secondaryColor: "#C59D1F" },
  header: {
    badge: "O Protocolo TegPro",
    title: "Engenharia Reversa da Venda",
    subtitle: "Não é um curso. É a instalação do nosso sistema operacional dividido em 4 fases."
  },
  modules: [
    { id: "01", phase: "FASE DE FUNDAÇÃO", title: "Setup da Máquina", description: "Antes de acelerar, blindamos o chassi. Configuramos seu Business Manager e estruturamos o CRM.", tags: ["Setup Técnico", "Governança"], icon: "ph:wrench-bold" },
    { id: "02", phase: "FASE DE TRAÇÃO", title: "Tráfego de Alta Intenção", description: "Campanhas que buscam o 'lead comprador'. Estratégias validadas com milhões em verba.", tags: ["Google Ads", "Meta Ads"], icon: "ph:target-bold" },
    { id: "03", phase: "FASE DE CONVERSÃO", title: "Comercial & Scripts", description: "O tráfego traz o lead, o processo traz o dinheiro. Scripts de vendas e playbooks de objeções.", tags: ["Playbook", "Spin Selling"], icon: "ph:users-three-bold" },
    { id: "04", phase: "FASE DE ESCALA", title: "Automação & LTV", description: "Implementação de automações de follow-up, recuperação de vendas e estratégias de upsell.", tags: ["Automação", "Z-API"], icon: "ph:robot-bold" }
  ],
  cta: { text: "Ver Grade Detalhada", link: "#grade" }
};

export default function CourseModules({ endpoint }: { endpoint?: string }) {
  const [data, setData] = useState<ConfigData | null>(null); // Começa nulo para economizar recursos
  const [hasStarted, setHasStarted] = useState(false); // Trava para disparar apenas uma vez
  const ref = useRef(null);
  
  // Detecta se o usuário chegou na seção. 'once: true' para não desmontar ao sair.
  const isInView = useInView(ref, { once: true, margin: "200px" }); 

  useEffect(() => {
    // Só carrega os dados e ativa o componente quando estiver visível (ou perto disso)
    if (isInView && !hasStarted) {
      setHasStarted(true);
      
      if (endpoint) {
        fetch(endpoint)
          .then(res => res.json())
          .then(json => setData(json))
          .catch(() => setData(FALLBACK_DATA));
      } else {
        setData(FALLBACK_DATA);
      }
    }
  }, [isInView, endpoint, hasStarted]);

  // --- VARIANTES DE ANIMAÇÃO ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.4, delayChildren: 0.2 } 
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "circOut" } }
  };

  const progressLineVariants: Variants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: { scaleY: 1, transition: { duration: 1.5, ease: "easeInOut" } }
  };

  // Se não chegou na seção ou os dados ainda não foram carregados, renderiza um placeholder vazio
  // para manter o scroll estável sem processar o conteúdo pesado.
  if (!hasStarted || !data) {
    return <section ref={ref} className="py-24 bg-[#020202] min-h-[600px]" />;
  }

  const accent = data.theme.accentColor;

  return (
    <section ref={ref} className="py-24 bg-[#020202] relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-[0.05]" style={{ backgroundColor: accent }} />
      
      <div className="container px-4 md:px-6 relative z-10 max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-20 space-y-6">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse"></span>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#FFD700] uppercase">{data.header.badge}</span>
           </div>
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">{data.header.title}</h2>
           <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">{data.header.subtitle}</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* LINHA PROGRESSIVA */}
          <div className="absolute left-[28px] md:left-[50%] top-0 bottom-0 w-px bg-white/5 transform md:-translate-x-1/2 hidden md:block">
            <motion.div 
              variants={progressLineVariants}
              className="w-full h-full shadow-[0_0_15px_rgba(255,215,0,0.5)]"
              style={{ 
                background: `linear-gradient(to bottom, transparent, ${accent}, ${accent}, transparent)`,
                boxShadow: `0 0 10px ${accent}`
              }}
            />
          </div>

          <div className="space-y-16">
            {data.modules.map((module, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div key={index} variants={cardVariants} className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="group relative p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-[#FFD700]/40 transition-all duration-500 overflow-hidden shadow-2xl">
                       <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                       <div className="absolute -right-4 -top-6 text-9xl font-black text-white/[0.01] group-hover:text-[#FFD700]/[0.03] transition-colors select-none font-mono tracking-tighter">{module.id}</div>
                       
                       <div className="relative z-10">
                          <span className="text-[10px] font-bold text-[#FFD700] tracking-widest uppercase mb-2 block">{module.phase}</span>
                          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#FFD700] transition-colors">{module.title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">{module.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {module.tags.map((tag, i) => (
                              <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-semibold text-gray-500 uppercase tracking-wider group-hover:border-[#FFD700]/20 group-hover:text-gray-300 transition-colors">{tag}</span>
                            ))}
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-14 h-14 z-20">
                     <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.4 + 0.3, type: "spring", stiffness: 200 }}
                        className="w-12 h-12 rounded-full bg-[#020202] border border-[#FFD700]/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.1)] group"
                     >
                        <Icon icon={module.icon} className="w-5 h-5 text-[#FFD700]" />
                     </motion.div>
                  </div>
                  <div className="w-full md:w-1/2 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA FINAL */}
        <div className="flex justify-center mt-24">
           <button className="group relative px-10 py-4 bg-gradient-to-b from-[#FFD700] to-[#C59D1F] rounded-full text-black font-black text-sm tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] active:scale-95 uppercase">
              <span className="relative z-10 flex items-center gap-3">
                {data.cta.text}
                <Icon icon="ph:arrow-right-bold" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
           </button>
        </div>
      </div>
    </section>
  );
}
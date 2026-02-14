"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- TIPAGEM DOS DADOS ---
export interface ComparisonFeature {
  label: string;
  competitor: string;
  us: string;
}

export interface ComparisonData {
  header: {
    badge: string;
    title: string;
    subtitle: string;
  };
  columns: {
    competitor: string;
    us: string;
  };
  features: ComparisonFeature[];
  // Novos campos para o botão dinâmico
  cta?: {
    text: string;
    url?: string;
    variant?: 'default' | 'outline' | 'gradient' | 'ghost';
    icon?: string;
    target?: '_self' | '_blank';
  };
}

interface ComparisonTableProps {
  data: ComparisonData | null;
}

export default function ComparacaoConcorrentes({ data }: ComparisonTableProps) {
  // Segurança: Se não houver dados ou se a estrutura estiver errada (sem features), não renderiza
  if (!data || !data.features) return null;

  // Configurações padrão para o CTA
  const ctaConfig = data.cta || {
    text: "Escolher TegPro",
    url: "#",
    variant: "default",
    target: "_self"
  };

  // Classes de variante para o botão
  const buttonVariants = {
    default: "bg-[#FFD700] hover:bg-[#E5C100] text-black shadow-lg",
    outline: "bg-transparent border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10",
    gradient: "bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#E5C100] hover:to-[#FF8C00] text-black",
    ghost: "bg-transparent text-[#FFD700] hover:bg-[#FFD700]/10"
  };

  // Função para renderizar o botão
  const renderButton = () => {
    const buttonClasses = `
      w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-colors 
      flex items-center justify-center gap-2
      ${buttonVariants[ctaConfig.variant || 'default']}
    `;

    const buttonContent = (
      <>
        {ctaConfig.icon && <Icon icon={ctaConfig.icon} className="w-5 h-5" />}
        {ctaConfig.text}
      </>
    );

    // Se tiver URL, renderiza como Link
    if (ctaConfig.url) {
      if (ctaConfig.url.startsWith('/')) {
        // URL interna (Next.js Link)
        return (
          <Link 
            href={ctaConfig.url} 
            target={ctaConfig.target || '_self'}
            className={buttonClasses}
          >
            {buttonContent}
          </Link>
        );
      } else {
        // URL externa (tag a normal)
        return (
          <a 
            href={ctaConfig.url} 
            target={ctaConfig.target || '_self'}
            rel={ctaConfig.target === '_blank' ? 'noopener noreferrer' : undefined}
            className={buttonClasses}
          >
            {buttonContent}
          </a>
        );
      }
    }

    // Se não tiver URL, renderiza como button
    return (
      <button className={buttonClasses}>
        {buttonContent}
      </button>
    );
  };

  return (
    <section className="py-24 bg-[#020202] relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      {/* Luz de Fundo focada na coluna da TegPro */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[400px] h-[800px] bg-[#FFD700]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <Icon icon="ph:scales-bold" className="text-gray-400 w-4 h-4" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                {data.header.badge}
              </span>
           </div>
           <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
             {data.header.title}
           </h2>
           <p className="text-gray-400 max-w-xl mx-auto">
             {data.header.subtitle}
           </p>
        </div>

        {/* TABELA */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 items-center">
            
            {/* COLUNA 1: LABELS (Escondida no Mobile) */}
            <div className="hidden md:flex flex-col gap-6 py-8">
                <div className="h-16"></div> 
                {data.features.map((feature, i) => (
                    <div key={i} className="h-16 flex items-center text-gray-400 font-medium text-sm border-b border-white/5">
                        {feature.label}
                    </div>
                ))}
            </div>

            {/* COLUNA 2: CONCORRÊNCIA */}
            <div className="flex flex-col gap-6 p-8 rounded-2xl border border-white/5 bg-[#0A0A0A]/50 grayscale opacity-70">
                <div className="h-16 flex flex-col justify-center border-b border-white/5">
                    <h3 className="text-xl font-bold text-gray-500">{data.columns.competitor}</h3>
                </div>
                {data.features.map((feature, i) => (
                    <div key={i} className="h-auto md:h-16 flex flex-col justify-center border-b border-white/5 py-4 md:py-0">
                        <span className="md:hidden text-[10px] uppercase text-gray-600 font-bold mb-1">{feature.label}</span>
                        <div className="flex items-center gap-3">
                            <Icon icon="ph:x-circle-bold" className="text-gray-600 w-5 h-5 flex-shrink-0" />
                            <span className="text-sm text-gray-500">{feature.competitor}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* COLUNA 3: TEGPRO (Destaque) */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col gap-6 p-8 rounded-2xl border border-[#FFD700]/30 bg-[#0F0F0F] shadow-[0_0_50px_rgba(255,215,0,0.1)] overflow-hidden group mt-8 md:mt-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/5 to-transparent pointer-events-none" />
                
                <div className="h-16 flex flex-col justify-center border-b border-[#FFD700]/10 relative z-10">
                    <div className="absolute top-0 right-0 bg-[#FFD700] text-black text-[9px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                        RECOMENDADO
                    </div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {data.columns.us}
                    </h3>
                </div>

                {data.features.map((feature, i) => (
                    <div key={i} className="h-auto md:h-16 flex flex-col justify-center border-b border-[#FFD700]/10 py-4 md:py-0 relative z-10">
                        <span className="md:hidden text-[10px] uppercase text-[#FFD700]/50 font-bold mb-1">{feature.label}</span>
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                                <Icon icon="ph:check-bold" className="text-[#FFD700] w-3 h-3" />
                            </div>
                            <span className="text-sm text-white font-medium">{feature.us}</span>
                        </div>
                    </div>
                ))}
                
                {/* BOTÃO DINÂMICO */}
                <div className="mt-4 pt-4">
                  {renderButton()}
                </div>
            </motion.div>

        </div>

      </div>
    </section>
  );
}
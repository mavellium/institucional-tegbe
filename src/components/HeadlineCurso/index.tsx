"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button"; 
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

// --- ÁREA DE CONTEÚDO (EDITÁVEL) ---
const heroContent = {
  headline: {
    prefix: "Você não precisa entender de internet para",
    highlight: "começar a vender online."
  },
  subheadline: {
    main: "Descubra o passo a passo completo —",
    highlight: "do zero à sua primeira venda.",
    description: "Produto, fornecedor, loja, tráfego e atendimento: tudo explicado de forma simples, prática e sem enrolação."
  },
  cta: {
    primary: {
      text: "COMEÇAR AGORA",
      url: "#cursos"
    },
    secondary: {
      text: "Ver Conteúdo",
      url: "#conteudo"
    }
  },
  socialProof: {
    count: "+1.200",
    label: "alunos formados"
  },
  card: {
    header: {
      title: "Ecossistema TegPro",
      subtitle: "Status: Escala Permitida",
      tag: "Sistema Ativo"
    },
    items: [
      { name: 'Gestão de Tráfego 3.0', status: 'Liberado' },
      { name: 'Copywriting Neural', status: 'Liberado' },
      { name: 'Automação & CRM', status: 'Liberado' },
      { name: 'Vendas High-Ticket', status: 'Bloqueado' }
    ],
    footer: {
      label: "PROGRESSO",
      value: "75%"
    },
    floatingBadge: {
      label: "ROI Mensal",
      value: "+145%"
    }
  }
};

export default function HeroSplit() {
  const [mounted, setMounted] = useState(false);

  // --- PARALLAX LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center bg-[#020202] overflow-hidden selection:bg-[#FFD700] selection:text-black font-sans pt-[80px]">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-0"></div>
      
      {/* Ambient Light (Gold) */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#FFD700] rounded-full blur-[200px] opacity-[0.04] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#FFD700] rounded-full blur-[180px] opacity-[0.03] pointer-events-none" />
      
      {/* Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>


      <div className="container relative z-10 w-full px-4 md:px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">

          {/* --- COLUNA ESQUERDA (TEXTO) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left relative justify-center"
          >
            
            {/* Headline Ajustada: Sem quebra de linha forçada antes do destaque */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-4 xl:mb-6">
              {heroContent.headline.prefix}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DBB46C] via-[#FFD700] to-[#B8860B] drop-shadow-[0_0_25px_rgba(219,180,108,0.2)]">
                {heroContent.headline.highlight}
              </span>
            </h1>

            {/* Subheadline Compacta: Reduzi margens */}
            <div className="mb-6 xl:mb-8 pl-5 border-l-2 border-[#FFD700]/40 space-y-2 xl:space-y-3">
              <p className="text-base md:text-lg lg:text-xl text-gray-200 font-medium leading-tight max-w-lg">
                {heroContent.subheadline.main} <span className="text-[#FFD700]">{heroContent.subheadline.highlight}</span>
              </p>
              <p className="text-xs md:text-sm text-gray-400 font-light max-w-md leading-relaxed">
                {heroContent.subheadline.description}
              </p>
            </div>

            {/* Botões Compactos */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a href={heroContent.cta.primary.url} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFD700] to-[#996515] rounded-full blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
                {/* Altura reduzida para h-12 (48px) para ganhar espaço */}
                <Button className="relative h-12 px-8 rounded-full bg-gradient-to-b from-[#FFD700] to-[#C59D1F] hover:from-[#ffe066] hover:to-[#d4a017] text-black font-black text-sm lg:text-base tracking-wide transition-all active:scale-[0.98] border border-[#ffe066]/30 shadow-lg">
                  {heroContent.cta.primary.text}
                  <Icon icon="lucide:arrow-right" className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              
              <a href={heroContent.cta.secondary.url} className="group">
                <Button variant="ghost" className="h-12 px-6 rounded-full text-gray-400 hover:text-[#FFD700] hover:bg-[#FFD700]/5 font-medium text-sm lg:text-base transition-all border border-transparent hover:border-[#FFD700]/20">
                  {heroContent.cta.secondary.text}
                </Button>
              </a>
            </div>

            {/* Social Proof */}
            <div className="mt-6 xl:mt-8 pt-4 xl:pt-5 flex items-center gap-3 text-xs text-gray-500 border-t border-white/5 w-full max-w-xs">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-6 h-6 rounded-full bg-gray-800 border-2 border-[#020202] flex items-center justify-center overflow-hidden">
                      <Icon icon="ph:user-fill" className="text-gray-500 text-[10px]" />
                   </div>
                 ))}
               </div>
               <p><span className="text-white font-bold">{heroContent.socialProof.count}</span> {heroContent.socialProof.label}</p>
            </div>

          </motion.div>


          {/* --- COLUNA DIREITA (CARD 3D) - Ajustado Max-W --- */}
          <div 
             className="relative hidden lg:flex justify-center items-center h-full perspective-[1000px]" 
             onMouseMove={handleMouseMove}
             onMouseLeave={handleMouseLeave}
          >
            <motion.div 
               style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
               initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
               animate={{ opacity: 1, scale: 1, rotateX: 0 }}
               transition={{ duration: 1, delay: 0.2, type: "spring" }}
               // Reduzi um pouco o max-w para 380px para dar respiro
               className="relative w-full max-w-[380px] aspect-[4/5] bg-[#0A0A0A]/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden group"
            >
                {/* Reflexo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
                
                {/* Header Card */}
                <div className="p-5 pb-4 border-b border-white/5 bg-white/[0.02]">
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-[#FFD700]/10 rounded-xl border border-[#FFD700]/20 shadow-[0_0_10px_rgba(255,215,0,0.1)]">
                        <Icon icon="ph:chart-line-up-bold" className="w-5 h-5 text-[#FFD700]" />
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> {heroContent.card.header.tag}
                      </div>
                   </div>
                   <h3 className="text-lg font-bold text-white">{heroContent.card.header.title}</h3>
                   <p className="text-gray-500 text-[10px] mt-1">{heroContent.card.header.subtitle}</p>
                </div>

                {/* Lista */}
                <div className="p-5 space-y-2 flex-1">
                   {heroContent.card.items.map((item, i) => (
                      <div key={i} className="group/item flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#FFD700]/30 hover:bg-[#FFD700]/5 transition-all cursor-default">
                         <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Bloqueado' ? 'bg-gray-600' : 'bg-[#FFD700] shadow-[0_0_8px_#FFD700]'}`} />
                            <span className={`text-[11px] font-medium ${item.status === 'Bloqueado' ? 'text-gray-500' : 'text-gray-200 group-hover/item:text-white'}`}>{item.name}</span>
                         </div>
                         {item.status === 'Bloqueado' ? (
                            <Icon icon="ph:lock-simple-fill" className="text-gray-600 w-3 h-3" />
                         ) : (
                            <Icon icon="ph:check-bold" className="text-[#FFD700] w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                         )}
                      </div>
                   ))}
                </div>

                {/* Footer Progresso */}
                <div className="p-4 border-t border-white/5 bg-[#050505]/50">
                   <div className="flex justify-between text-[10px] text-gray-400 mb-2 font-mono">
                      <span>{heroContent.card.footer.label}</span>
                      <span className="text-[#FFD700]">{heroContent.card.footer.value}</span>
                   </div>
                   <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: heroContent.card.footer.value }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        className="h-full bg-[#FFD700] shadow-[0_0_10px_#FFD700]" 
                      />
                   </div>
                </div>

            </motion.div>
            
            {/* Elemento Flutuante */}
            <motion.div 
              animate={{ y: [-6, 6, -6], rotate: [0, 3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-12 z-30"
              style={{ transform: "translateZ(50px)" }}
            >
               <div className="bg-[#151515] p-2.5 rounded-xl border border-white/10 shadow-2xl flex items-center gap-2 backdrop-blur-md">
                  <div className="bg-green-500/20 p-1 rounded-lg">
                    <Icon icon="ph:trend-up-bold" className="w-3.5 h-3.5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-[8px] text-gray-400 uppercase">{heroContent.card.floatingBadge.label}</p>
                    <p className="text-[10px] font-bold text-white">{heroContent.card.floatingBadge.value}</p>
                  </div>
               </div>
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent pointer-events-none z-20" />
    </section>
  );
}
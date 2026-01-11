"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button"; 
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

// --- INTERFACE DE ENGENHARIA DE DADOS (CONTROLE TOTAL) ---
interface HeroData {
  theme: { 
    accentColor: string; 
    secondaryColor: string;
    // Campos para controle absoluto do CTA
    ctaBackgroundColor?: string; // Hex ou Gradient
    ctaTextColor: string;
    ctaIconColor: string;
    ctaGlowColor?: string; // Cor da aura/brilho atrás do botão
  };
  content: {
    headline: { prefix: string; highlight: string; };
    subheadline: { main: string; highlight: string; description: string; };
    cta: { primary: { text: string; url: string; }; secondary: { text: string; url: string; }; };
    socialProof: { count: string; label: string; };
    card: {
      header: { title: string; subtitle: string; tag: string; };
      items: { name: string; status: string; }[];
      footer: { label: string; value: string; };
      floatingBadge: { label: string; value: string; };
    };
  };
}

const FALLBACKS: Record<string, HeroData> = {
  marketing: {
    theme: {
      accentColor: "#FFD700",
      secondaryColor: "#B8860B",
      ctaTextColor: "#000000ff",
      ctaIconColor: "#000000",
      ctaGlowColor: "#B8860B66"
    },
    content: {
      headline: { prefix: "Sua empresa não precisa de posts,", highlight: "ela precisa de lucro." },
      subheadline: {
        main: "Instalamos um Ecossistema de Receita —",
        highlight: "previsível e escalável.",
        description: "Unimos Tráfego de elite, CRM inteligente e Engenharia de IA para transformar cliques em clientes fiéis."
      },
      cta: {
        primary: { text: "QUERO ESCALAR", url: "#contato" },
        secondary: { text: "Ver Metodologia", url: "#metodo" }
      },
      socialProof: { count: "+R$ 10M", label: "gerados para clientes" },
      card: {
        header: { title: "Mavellium Engine", subtitle: "Status: Alta Performance", tag: "Sistema Ativo" },
        items: [
          { name: "Tráfego Pago Elite", status: "Liberado" },
          { name: "Copywriting de Resposta Direta", status: "Liberado" },
          { name: "Dashboard de Dados (GA4)", status: "Liberado" },
          { name: "Funcionário de IA", status: "Bloqueado" }
        ],
        footer: { label: "OTIMIZAÇÃO", value: "92%" },
        floatingBadge: { label: "ROAS Médio", value: "8.4x" }
      }
    }
  },
  cursos: {
    theme: {
      accentColor: "#FFD700",
      secondaryColor: "#B8860B",
      ctaBackgroundColor: "#FFD700", // Fundo sólido dourado
      ctaTextColor: "#000000",
      ctaIconColor: "#000000",
      ctaGlowColor: "rgba(255, 215, 0, 0.3)"
    },
    content: {
      headline: { prefix: "Você não precisa entender de internet para", highlight: "começar a vender online." },
      subheadline: {
        main: "Descubra o passo a passo completo —",
        highlight: "do zero à sua primeira venda.",
        description: "Produto, fornecedor, loja, tráfego e atendimento: tudo explicado de forma simples, prática e sem enrolação."
      },
      cta: {
        primary: { text: "COMEÇAR AGORA", url: "#cursos" },
        secondary: { text: "Ver Conteúdo", url: "#conteudo" }
      },
      socialProof: { count: "+1.200", label: "alunos formados" },
      card: {
        header: { title: "Ecossistema TegPro", subtitle: "Status: Escala Permitida", tag: "Sistema Ativo" },
        items: [
          { name: 'Gestão de Tráfego 3.0', status: 'Liberado' },
          { name: 'Copywriting Neural', status: 'Liberado' },
          { name: 'Automação & CRM', status: 'Liberado' },
          { name: 'Vendas High-Ticket', status: 'Bloqueado' }
        ],
        footer: { label: "PROGRESSO", value: "75%" },
        floatingBadge: { label: "ROI Mensal", value: "+145%" }
      }
    }
  }
};

export default function HeroSplit({ endpoint, variant = "marketing" }: { endpoint?: string, variant?: "marketing" | "cursos" }) {
  const initialData = FALLBACKS[variant] || FALLBACKS.marketing;
  const [data, setData] = useState<HeroData>(initialData);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (endpoint) {
      fetch(endpoint)
        .then(res => res.json())
        .then(json => setData(json))
        .catch(() => setData(initialData));
    }
  }, [endpoint, variant, initialData]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  if (!mounted) return null;

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center bg-[#020202] overflow-hidden font-sans pt-[80px]">
      
      {/* Texture & Ambient Light */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-0"></div>
      <div 
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.04] pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: data.theme.accentColor }}
      />
      
      {/* Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="container relative z-10 w-full px-4 md:px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">

          {/* COLUNA ESQUERDA */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-6">
              {data.content.headline.prefix}{" "}
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r transition-all duration-1000"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${data.theme.accentColor}, ${data.theme.secondaryColor})`,
                  filter: `drop-shadow(0 0 25px ${data.theme.accentColor}40)`
                }}
              >
                {data.content.headline.highlight}
              </span>
            </h1>

            <div className="mb-8 pl-5 border-l-2 space-y-3" style={{ borderColor: `${data.theme.accentColor}66` }}>
              <p className="text-base md:text-lg lg:text-xl text-gray-200 font-medium leading-tight max-w-lg">
                {data.content.subheadline.main} <span style={{ color: data.theme.accentColor }}>{data.content.subheadline.highlight}</span>
              </p>
              <p className="text-xs md:text-sm text-gray-400 font-light max-w-md leading-relaxed">
                {data.content.subheadline.description}
              </p>
            </div>

            {/* CTA COM CONTROLE TOTAL DE ESTILIZAÇÃO */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a href={data.content.cta.primary.url} className="group relative">
                <div 
                    className="absolute -inset-0.5 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-200"
                    style={{ backgroundColor: data.theme.ctaGlowColor || data.theme.accentColor }}
                />
                <Button 
                    className="relative h-12 px-8 rounded-full font-black text-sm lg:text-base tracking-wide transition-all border border-white/10 active:scale-[0.98]"
                    style={{ 
                        backgroundColor: data.theme.ctaBackgroundColor || data.theme.accentColor,
                        color: data.theme.ctaTextColor 
                    }}
                >
                  {data.content.cta.primary.text}
                  <Icon 
                    icon="lucide:arrow-right" 
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                    style={{ color: data.theme.ctaIconColor }}
                  />
                </Button>
              </a>
              
              <Button variant="ghost" className="h-12 px-6 rounded-full text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                {data.content.cta.secondary.text}
              </Button>
            </div>

            <div className="mt-8 pt-5 flex items-center gap-3 text-xs text-gray-500 border-t border-white/5 w-full max-xs">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-6 h-6 rounded-full bg-gray-800 border-2 border-[#020202] flex items-center justify-center overflow-hidden">
                      <Icon icon="ph:user-fill" className="text-gray-500 text-[10px]" />
                   </div>
                 ))}
               </div>
               <p><span className="text-white font-bold">{data.content.socialProof.count}</span> {data.content.socialProof.label}</p>
            </div>
          </motion.div>

          {/* COLUNA DIREITA (CARD 3D) */}
          <div className="relative hidden lg:flex justify-center items-center h-full perspective-[1000px]" onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}>
            <motion.div 
               style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
               className="relative w-full max-w-[380px] aspect-[4/5] bg-[#0A0A0A]/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden group"
            >
                {/* Header do Card */}
                <div className="p-5 pb-4 border-b border-white/5 bg-white/[0.02]">
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-2 rounded-xl border transition-all" style={{ backgroundColor: `${data.theme.accentColor}1A`, borderColor: `${data.theme.accentColor}33` }}>
                        <Icon icon="ph:chart-line-up-bold" className="w-5 h-5" style={{ color: data.theme.accentColor }} />
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> {data.content.card.header.tag}
                      </div>
                   </div>
                   <h3 className="text-lg font-bold text-white">{data.content.card.header.title}</h3>
                   <p className="text-gray-500 text-[10px] mt-1">{data.content.card.header.subtitle}</p>
                </div>

                {/* Lista */}
                <div className="p-5 space-y-2 flex-1">
                   {data.content.card.items.map((item, i) => (
                      <div key={i} className="group/item flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 transition-all">
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.status === 'Bloqueado' ? '#444' : data.theme.accentColor, boxShadow: item.status !== 'Bloqueado' ? `0 0 8px ${data.theme.accentColor}` : 'none' }} />
                            <span className={`text-[11px] font-medium ${item.status === 'Bloqueado' ? 'text-gray-500' : 'text-gray-200'}`}>{item.name}</span>
                         </div>
                         <Icon icon={item.status === 'Bloqueado' ? "ph:lock-simple-fill" : "ph:check-bold"} className="w-3 h-3" style={{ color: item.status === 'Bloqueado' ? '#444' : data.theme.accentColor }} />
                      </div>
                   ))}
                </div>

                {/* Footer Progresso */}
                <div className="p-4 border-t border-white/5 bg-[#050505]/50">
                   <div className="flex justify-between text-[10px] text-gray-400 mb-2 font-mono">
                      <span>{data.content.card.footer.label}</span>
                      <span style={{ color: data.theme.accentColor }}>{data.content.card.footer.value}</span>
                   </div>
                   <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: data.content.card.footer.value }}
                        className="h-full" 
                        style={{ backgroundColor: data.theme.accentColor, boxShadow: `0 0 10px ${data.theme.accentColor}` }} 
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
                    <p className="text-[8px] text-gray-400 uppercase">{data.content.card.floatingBadge.label}</p>
                    <p className="text-[10px] font-bold text-white">{data.content.card.floatingBadge.value}</p>
                  </div>
               </div>
            </motion.div>
          </div>

        </div>
      </div>
      
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent pointer-events-none z-20" />
    </section>
  );
}
"use client";

import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button"; 
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

// --- INTERFACES ---
interface HeroData {
  theme: { 
    accentColor: string; 
    secondaryColor: string;
    ctaTextColor: string;
    ctaIconColor: string;
    ctaGlowColor?: string;
    ctaBackgroundColor?: string;
  };
  content: {
    headline: { prefix: string; highlight: string; };
    subheadline: { main: string; highlight: string; description: string; };
    cta: { primary: { text: string; url: string; }; secondary: { text: string; url: string; }; };
    socialProof: { count: string; label: string; };
    card: {
      header: { title: string; subtitle: string; tag: string; };
      items: { name: string; status: string; }[]; // LISTA DINÂMICA
      footer: { label: string; value: string; };
      floatingBadge: { label: string; value: string; };
    };
  };
}

export default function HeroSplit({ 
  endpoint = "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/headline", 
  variant = "cursos" 
}: { 
  endpoint?: string, 
  variant?: "marketing" | "cursos" | "home" | "ecommerce" 
}) {
  const [apiData, setApiData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const res = await fetch(endpoint);
        const json = await res.json();
        setApiData(json);
      } catch (error) {
        console.error("Erro ao carregar Headline:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  // Mapeamento Dinâmico - INTEGRANDO OS ITENS DA API
  const data = useMemo<HeroData | null>(() => {
    if (!apiData || !apiData[variant]) return null;
    
    const raw = apiData[variant];
    
    return {
      theme: {
        accentColor: raw.configuracoes?.corDestaque || "#FFD700",
        secondaryColor: "#B8860B",
        ctaTextColor: "#000000",
        ctaIconColor: "#000000",
        ctaGlowColor: `${raw.configuracoes?.corDestaque}4D`
      },
      content: {
        headline: {
          prefix: raw.content?.headline?.prefix || raw.titulo?.chamada,
          highlight: raw.content?.headline?.highlight || "lucro."
        },
        subheadline: {
          main: raw.content?.subheadline?.main || "Instalamos um Ecossistema —",
          highlight: raw.content?.subheadline?.highlight || "previsível.",
          description: raw.content?.subheadline?.description || raw.subtitulo
        },
        cta: {
          primary: { 
            text: raw.content?.cta?.primary?.text || raw.botao?.texto, 
            url: raw.content?.cta?.primary?.url || raw.botao?.link 
          },
          secondary: { 
            text: raw.content?.cta?.secondary?.text || "Ver Conteúdo", 
            url: raw.content?.cta?.secondary?.url || "#" 
          }
        },
        socialProof: {
          count: raw.content?.socialProof?.count || "+1.200",
          label: raw.content?.socialProof?.label || "alunos"
        },
        card: {
          header: {
            title: raw.content?.card?.header?.title || "Ecossistema",
            subtitle: raw.content?.card?.header?.subtitle || "Status: Ativo",
            tag: raw.content?.card?.header?.tag || "Sistema"
          },
          // CORREÇÃO: Pegando os itens diretamente da API
          items: raw.content?.card?.items || [], 
          footer: {
            label: raw.content?.card?.footer?.label || "PROGRESSO",
            value: raw.content?.card?.footer?.value || "75%"
          },
          floatingBadge: {
            label: raw.content?.card?.floatingBadge?.label || "ROI",
            value: raw.content?.card?.floatingBadge?.value || "+145%"
          }
        }
      }
    };
  }, [apiData, variant]);

  // Lógica de Mouse/3D
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

  if (!mounted || loading || !data) return (
    <div className="h-screen bg-[#020202] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/10 border-t-[#FFCC00] rounded-full animate-spin" />
    </div>
  );

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center bg-[#020202] overflow-hidden font-sans pt-[80px]">
      
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-0"></div>
      <div 
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.04] pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: data.theme.accentColor }}
      />
      
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="container relative z-10 w-full px-4 md:px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">

          {/* LEFT CONTENT */}
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

            <div className="flex flex-col sm:flex-row gap-4 flex justify-center w-full items-center sm:w-auto">
              <a href={data.content.cta.primary.url} className="group relative">
                <div 
                    className="absolute -inset-1 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-200"
                    style={{ backgroundColor: data.theme.ctaGlowColor || data.theme.accentColor }}
                />
                <Button 
                    className="relative h-14 px-10 rounded-full font-black text-sm lg:text-base tracking-widest transition-all border border-white/10 active:scale-[0.98]"
                    style={{ 
                        backgroundColor: data.theme.accentColor,
                        color: data.theme.ctaTextColor 
                    }}
                >
                  {data.content.cta.primary.text}
                  <Icon icon="lucide:arrow-right" className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              
              <Button variant="ghost" className="h-14 px-8 rounded-full text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all font-bold">
                {data.content.cta.secondary.text}
              </Button>
            </div>

            <div className="mt-10 pt-6 flex items-center gap-3 text-xs text-gray-500 border-t border-white/5 w-full max-w-[300px]">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-[#020202] flex items-center justify-center">
                      <Icon icon="ph:user-bold" className="text-gray-400 text-sm" />
                   </div>
                 ))}
               </div>
               <p><span className="text-white font-bold">{data.content.socialProof.count}</span> {data.content.socialProof.label}</p>
            </div>
          </motion.div>

          {/* RIGHT CONTENT (DYNAMIC CARD) */}
          <div className="relative hidden lg:flex justify-center items-center h-full perspective-[1200px]" onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}>
            <motion.div 
               style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
               className="relative w-full max-w-[400px] aspect-[4/5] bg-[#0A0A0A]/95 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden group"
            >
                <div className="p-6 pb-5 border-b border-white/5 bg-white/[0.01]">
                   <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded-2xl border transition-all" style={{ backgroundColor: `${data.theme.accentColor}1A`, borderColor: `${data.theme.accentColor}33` }}>
                        <Icon icon="ph:shield-check-bold" className="w-6 h-6" style={{ color: data.theme.accentColor }} />
                      </div>
                      <div className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {data.content.card.header.tag}
                      </div>
                   </div>
                   <h3 className="text-xl font-bold text-white tracking-tight">{data.content.card.header.title}</h3>
                   <p className="text-gray-500 text-xs mt-1.5 font-medium">{data.content.card.header.subtitle}</p>
                </div>

                {/* LISTA DINÂMICA DA API */}
                <div className="p-6 space-y-3 flex-1">
                   {data.content.card.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 transition-all hover:bg-white/[0.05]">
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.status === 'Bloqueado' ? '#333' : data.theme.accentColor, boxShadow: item.status !== 'Bloqueado' ? `0 0 10px ${data.theme.accentColor}` : 'none' }} />
                            <span className={`text-xs font-semibold ${item.status === 'Bloqueado' ? 'text-gray-600' : 'text-gray-300'}`}>{item.name}</span>
                         </div>
                         <Icon icon={item.status === 'Bloqueado' ? "ph:lock-key-fill" : "ph:check-circle-fill"} className="w-4 h-4" style={{ color: item.status === 'Bloqueado' ? '#333' : data.theme.accentColor }} />
                      </div>
                   ))}
                </div>

                <div className="p-6 border-t border-white/5 bg-[#050505]/80">
                   <div className="flex justify-between text-[11px] text-gray-400 mb-3 font-mono font-bold uppercase tracking-wider">
                      <span>{data.content.card.footer.label}</span>
                      <span style={{ color: data.theme.accentColor }}>{data.content.card.footer.value}</span>
                   </div>
                   <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: data.content.card.footer.value }}
                        className="h-full shadow-[0_0_15px_rgba(255,204,0,0.5)]" 
                        style={{ backgroundColor: data.theme.accentColor }} 
                      />
                   </div>
                </div>
            </motion.div>

            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 top-20 z-30"
              style={{ transform: "translateZ(80px)" }}
            >
               <div className="bg-[#111] p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3 backdrop-blur-xl">
                  <div className="bg-green-500/20 p-2 rounded-xl">
                    <Icon icon="ph:trend-up-bold" className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{data.content.card.floatingBadge.label}</p>
                    <p className="text-sm font-black text-white">{data.content.card.floatingBadge.value}</p>
                  </div>
               </div>
            </motion.div>
          </div>

        </div>
      </div>
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent pointer-events-none z-20" />
    </section>
  );
}
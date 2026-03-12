"use client";

import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createPortal } from "react-dom";

// --- INTERFACES (com suporte a modal) ---
interface CTAItem {
  text: string;
  url: string;
  use_form?: boolean;
  form_html?: string;
}

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
    cta: {
      primary: CTAItem;
      secondary: CTAItem;
    };
    socialProof: { count: string; label: string; };
    card: {
      header: { title: string; subtitle: string; tag: string; };
      items: { name: string; status: string; }[];
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            url: raw.content?.cta?.primary?.url || raw.botao?.link,
            use_form: raw.content?.cta?.primary?.use_form || false,
            form_html: raw.content?.cta?.primary?.form_html || "",
          },
          secondary: {
            text: raw.content?.cta?.secondary?.text || "Ver Conteúdo",
            url: raw.content?.cta?.secondary?.url || "#",
            use_form: raw.content?.cta?.secondary?.use_form || false,
            form_html: raw.content?.cta?.secondary?.form_html || "",
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

  const handleCtaClick = (e: React.MouseEvent, cta: CTAItem) => {
    if (cta.use_form) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  if (!mounted || loading || !data) return (
    <div className="h-screen bg-[#020202] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/10 border-t-[#FFCC00] rounded-full animate-spin" />
    </div>
  );

  return (
    <>
      <section className="relative w-full h-screen min-h-[500px] flex items-center justify-center bg-[#020202] overflow-hidden font-sans pt-40 pb-20">

        {/* Atmosphere */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-0"></div>
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.04] pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: data.theme.accentColor }}
        />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

        <div className="container relative z-10 w-full px-4 md:px-6 h-full- flex items-center">
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
                {/* CTA PRIMÁRIO - COM SUPORTE A MODAL */}
                {data.content.cta.primary.use_form ? (
                  <button
                    onClick={(e) => handleCtaClick(e, data.content.cta.primary)}
                    className="group relative cursor-pointer"
                  >
                    <div
                      className="absolute -inset-1 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-200"
                      style={{ backgroundColor: data.theme.ctaGlowColor || data.theme.accentColor }}
                    />
                    <div
                      className="relative h-14 px-10 rounded-full font-black text-sm lg:text-base tracking-widest transition-all border border-white/10 active:scale-[0.98] flex items-center justify-center"
                      style={{
                        backgroundColor: data.theme.accentColor,
                        color: data.theme.ctaTextColor
                      }}
                    >
                      {data.content.cta.primary.text}
                      <Icon icon="lucide:arrow-right" className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                ) : (
                  <Link href={data.content.cta.primary.url} className="group relative">
                    <div
                      className="absolute -inset-1 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-200"
                      style={{ backgroundColor: data.theme.ctaGlowColor || data.theme.accentColor }}
                    />
                    <Button
                      aria-label={data.content.cta.primary.text}
                      className="relative h-14 px-10 rounded-full font-black text-sm lg:text-base tracking-widest transition-all border border-white/10 active:scale-[0.98]"
                      style={{
                        backgroundColor: data.theme.accentColor,
                        color: data.theme.ctaTextColor
                      }}
                    >
                      {data.content.cta.primary.text}
                      <Icon icon="lucide:arrow-right" className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                )}

                {/* CTA SECUNDÁRIO (pode ser modal ou link) */}
                {data.content.cta.secondary.use_form ? (
                  <button
                    onClick={(e) => handleCtaClick(e, data.content.cta.secondary)}
                    className="h-14 px-8 rounded-full text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all font-bold cursor-pointer"
                  >
                    {data.content.cta.secondary.text}
                  </button>
                ) : (
                  <Button
                    variant="ghost"
                    className="h-14 px-8 rounded-full text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all font-bold"
                    asChild
                  >
                    <Link href={data.content.cta.secondary.url}>
                      {data.content.cta.secondary.text}
                    </Link>
                  </Button>
                )}
              </div>

              <div className="mt-10 pt-6 flex items-center gap-3 text-xs text-gray-500 border-t border-white/5 w-full max-w-[300px]">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-[#020202] flex items-center justify-center">
                      <Icon icon="ph:user-bold" className="text-gray-400 text-sm" />
                    </div>
                  ))}
                </div>
                <p><span className="text-white font-bold">{data.content.socialProof.count}</span> {data.content.socialProof.label}</p>
              </div>
            </motion.div>

            {/* RIGHT CONTENT (DYNAMIC CARD) */}
            {/* RIGHT CONTENT (IMAGE) */}
            {/* RIGHT CONTENT (STATIC IMAGE) */}
            <div className="relative hidden lg:flex justify-center items-center h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-[550px] flex items-center justify-center"
              >
                {/* Glow de fundo estático para dar profundidade */}
                <div
                  className="absolute w-[80%] h-[80%] rounded-full blur-[120px] opacity-20"
                  style={{ backgroundColor: data.theme.accentColor }}
                />

                {/* Imagem com animação de flutuação leve (Y-axis apenas) */}
                <motion.img
                  src="/doni.jpg"
                  alt="Hero Illustration"
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10 w-full h-auto max-h-[500px] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                />

                {/* Badge Flutuante (Opcional - Remova se quiser 100% limpo) */}
                <motion.div
                  className="absolute -right-4 bottom-20 z-20 bg-[#111]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl"
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <Icon icon="ph:chart-line-up-bold" className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">{data.content.card.floatingBadge.label}</p>
                      <p className="text-sm font-black text-white">{data.content.card.floatingBadge.value}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent pointer-events-none z-20" />
      </section>

      {/* Modal com formulário - renderizado no body via portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[200px]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Icon icon="solar:close-circle-linear" className="w-5 h-5 text-gray-600" />
                </button>
                <div className="p-6">
                  {/* Aqui usamos o form_html do CTA primário (ou secundário, dependendo de qual abriu). 
                      Como o modal é compartilhado, por simplicidade usamos o primário; se quiser diferenciar,
                      pode armazenar qual CTA abriu o modal. */}
                  {data.content.cta.primary.form_html ? (
                    <div dangerouslySetInnerHTML={{ __html: data.content.cta.primary.form_html }} />
                  ) : data.content.cta.secondary.form_html ? (
                    <div dangerouslySetInnerHTML={{ __html: data.content.cta.secondary.form_html }} />
                  ) : (
                    <p className="text-gray-500">Formulário não disponível.</p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
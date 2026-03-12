"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useSwipeable } from "react-swipeable";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- INTERFACES ATUALIZADAS ---
export interface ServiceHeader {
  title: string;
  subtitle: string;
}

export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  badge?: string;
  color?: string;
}

export interface ServiceCTA {
  enabled: boolean;
  text: string;
  link: string;
  style?: "default" | "outline" | "ghost";
  showIcon?: boolean;
  icon?: string;
  position?: "below-content" | "below-image";
  use_form?: boolean;
  form_html?: string;
}

export interface ApiResponse {
  header: ServiceHeader;
  services: ServiceFeature[];
  cta?: ServiceCTA;
}

const getButtonClasses = (style: string = "default") => {
  const baseClasses =
    "inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95";

  switch (style) {
    case "outline":
      return `${baseClasses} border-2 border-[#E31B63] text-[#E31B63] hover:bg-[#E31B63]/10 hover:border-[#FF0F43] hover:text-[#FF0F43]`;
    case "ghost":
      return `${baseClasses} text-[#E31B63] hover:bg-[#E31B63]/10 hover:text-[#FF0F43]`;
    default:
      return `${baseClasses} bg-gradient-to-r from-[#FF0F43] to-[#E31B63] hover:from-[#FF1A4D] hover:to-[#F02B6D] hover:shadow-[0_0_30px_rgba(227,27,99,0.3)] text-white`;
  }
};

const ExploreDetails = () => {
  const [header, setHeader] = useState<ServiceHeader | null>(null);
  const [features, setFeatures] = useState<ServiceFeature[]>([]);
  const [ctaData, setCtaData] = useState<ServiceCTA | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const descriptionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const desktopImageContainerRef = useRef<HTMLDivElement>(null);
  const mobileImageContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const previousActiveFeatureRef = useRef<number>(-1);

  // --- INTEGRAÇÃO COM A API ---
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/services-marketing"
        );
        const data: ApiResponse = await response.json();

        if (data.services && data.services.length > 0) {
          setHeader(data.header);
          setFeatures(data.services);
          setCurrentImage(data.services[0].image);

          if (data.cta && data.cta.enabled !== false) {
            setCtaData(data.cta);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // --- ANIMAÇÃO DO CTA ---
  useEffect(() => {
    if (ctaData && ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [ctaData]);

  // --- NAVEGAÇÃO POR TECLADO NA LISTA DESKTOP ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveFeature((prev) => (prev + 1) % features.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [features.length]);

  // --- GERENCIAMENTO DO MODAL (ACESSIBILIDADE) ---
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
      // Focar no primeiro elemento interativo
      const focusable = modalContentRef.current?.querySelector(
        'button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable) (focusable as HTMLElement).focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // --- LÓGICA DE ANIMAÇÃO DAS IMAGENS (COM FRAMER MOTION) ---
  // Não precisamos mais do GSAP para a transição de imagem, usaremos AnimatePresence
  // Mas mantemos a função para mudar a imagem ativa
  const handleFeatureChange = (index: number, force = false) => {
    if ((isTransitioning || index === activeFeature) && !force) return;
    setIsTransitioning(true);

    if (activeFeature !== -1 && !force) {
      gsap.to(buttonsRef.current[activeFeature], {
        backgroundColor: "transparent",
        borderColor: "rgba(255,255,255,0.05)",
        duration: 0.3,
      });
      gsap.to(descriptionsRef.current[activeFeature], {
        height: 0,
        opacity: 0,
        marginTop: 0,
        duration: 0.3,
      });
    }

    setActiveFeature(index);
    setCurrentImage(features[index].image);

    gsap.to(buttonsRef.current[index], {
      backgroundColor: "rgba(227, 27, 99, 0.1)",
      borderColor: "#E31B63",
      duration: 0.4,
    });

    gsap.to(descriptionsRef.current[index], {
      height: "auto",
      opacity: 1,
      marginTop: 16,
      duration: 0.4,
      onComplete: () => setIsTransitioning(false),
    });
  };

  // Atualiza a imagem quando activeFeature muda (caso a mudança venha de outra fonte)
  useEffect(() => {
    if (features.length > 0 && previousActiveFeatureRef.current !== activeFeature) {
      setCurrentImage(features[activeFeature]?.image || "");
      previousActiveFeatureRef.current = activeFeature;
    }
  }, [activeFeature, features]);

  useEffect(() => {
    if (features.length > 0) {
      const timer = setTimeout(() => {
        handleFeatureChange(0, true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [features]);

  const handleCtaClick = (e: React.MouseEvent) => {
    if (ctaData?.use_form) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  // --- GESTOS DE SWIPE NO MOBILE ---
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      handleFeatureChange((activeFeature + 1) % features.length),
    onSwipedRight: () =>
      handleFeatureChange((activeFeature - 1 + features.length) % features.length),
    trackMouse: true,
  });

  if (loading) {
    return (
      <section className="py-24 bg-[#020202] px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="animate-pulse">
            <div className="h-4 w-24 bg-gray-700 rounded mb-3"></div>
            <div className="h-10 w-3/4 bg-gray-700 rounded"></div>
            <div className="grid grid-cols-12 gap-8 mt-12">
              <div className="col-span-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-gray-800 rounded-2xl"></div>
                ))}
              </div>
              <div className="col-span-8">
                <div className="aspect-video bg-gray-800 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (features.length === 0) return null;

  const titleWords = header?.title.split(" ") || [];
  const lastWord = titleWords.pop();
  const firstPart = titleWords.join(" ");
  const ctaPosition = ctaData?.position || "below-content";

  return (
    <>
      <section
        ref={sectionRef}
        className="py-24 bg-[#020202] px-6 relative border-t border-white/5 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

        <div className="mx-auto relative max-w-[1400px] z-10">
          <div className="mb-12 md:mb-16">
            <h2 className="text-sm font-bold text-[#E31B63] uppercase tracking-widest mb-3">
              {header?.subtitle}
            </h2>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              {firstPart}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E31B63] to-[#FF0F43]">
                {lastWord}.
              </span>
            </h1>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
            <div className="col-span-4 sticky top-24">
              <div
                className="flex flex-col space-y-3"
                role="tablist"
                aria-label="Lista de recursos"
              >
                {features.map((feature, index) => (
                  <button
                    key={feature.id}
                    ref={(el) => {
                      buttonsRef.current[index] = el;
                    }}
                    onClick={() => handleFeatureChange(index)}
                    className={`feature-button group w-full text-left p-6 rounded-2xl border transition-all ${
                      activeFeature === index
                        ? "bg-[#E31B63]/10 border-[#E31B63]"
                        : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10"
                    }`}
                    role="tab"
                    aria-selected={activeFeature === index}
                    aria-controls={`feature-panel-${index}`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg flex items-center gap-3 text-white">
                        <Icon
                          icon={feature.icon || "lucide:layers"}
                          className="w-6 h-6 text-[#E31B63] group-hover:scale-110 transition-transform"
                        />
                        {feature.title}
                      </h3>
                    </div>
                    <div
                      ref={(el) => {
                        descriptionsRef.current[index] = el;
                      }}
                      className="overflow-hidden h-0 opacity-0"
                    >
                      <p className="text-sm text-gray-400 leading-relaxed font-light border-l border-[#E31B63]/30 pl-4 mt-2">
                        {feature.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-8">
              <div
                id={`feature-panel-${activeFeature}`}
                className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] aspect-video"
                role="tabpanel"
                aria-labelledby={`feature-tab-${activeFeature}`}
              >
                <div ref={desktopImageContainerRef} className="w-full h-full relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImage}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={currentImage}
                        alt={features[activeFeature]?.title || "Imagem do recurso"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={activeFeature === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60"></div>
                </div>
              </div>

              {ctaData && ctaPosition === "below-image" && (
                <motion.div
                  ref={ctaRef}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center mt-8"
                >
                  {ctaData.use_form ? (
                    <button
                      onClick={handleCtaClick}
                      className={getButtonClasses(ctaData.style) + " cursor-pointer"}
                    >
                      {ctaData.showIcon && ctaData.icon && (
                        <Icon icon={ctaData.icon} className="w-5 h-5" />
                      )}
                      {ctaData.text}
                    </button>
                  ) : (
                    <Link
                      href={ctaData.link}
                      className={getButtonClasses(ctaData.style)}
                    >
                      {ctaData.showIcon && ctaData.icon && (
                        <Icon icon={ctaData.icon} className="w-5 h-5" />
                      )}
                      {ctaData.text}
                    </Link>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* MOBILE */}
          <div className="lg:hidden">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden mb-6">
              <div
                {...swipeHandlers}
                className="aspect-video relative"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={currentImage}
                      alt={features[activeFeature]?.title || "Imagem do recurso"}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  {features[activeFeature]?.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {features[activeFeature]?.description}
                </p>

                {/* Indicador de progresso (dots) */}
                <div className="flex justify-center gap-2 mt-4">
                  {features.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleFeatureChange(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeFeature
                          ? "w-6 bg-[#E31B63]"
                          : "w-1.5 bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Ver feature ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-white/10 text-white hover:border-[#E31B63] hover:text-[#E31B63]"
                    onClick={() =>
                      handleFeatureChange(
                        (activeFeature - 1 + features.length) % features.length
                      )
                    }
                    aria-label="Recurso anterior"
                  >
                    <Icon icon="lucide:arrow-left" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-white/10 text-white hover:border-[#E31B63] hover:text-[#E31B63]"
                    onClick={() =>
                      handleFeatureChange((activeFeature + 1) % features.length)
                    }
                    aria-label="Próximo recurso"
                  >
                    <Icon icon="lucide:arrow-right" />
                  </Button>
                </div>
              </div>
            </div>

            {ctaData && (
              <motion.div
                ref={ctaRef}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                {ctaData.use_form ? (
                  <button
                    onClick={handleCtaClick}
                    className={getButtonClasses(ctaData.style) + " cursor-pointer"}
                  >
                    {ctaData.showIcon && ctaData.icon && (
                      <Icon icon={ctaData.icon} className="w-5 h-5" />
                    )}
                    {ctaData.text}
                  </button>
                ) : (
                  <Link
                    href={ctaData.link}
                    className={getButtonClasses(ctaData.style)}
                  >
                    {ctaData.showIcon && ctaData.icon && (
                      <Icon icon={ctaData.icon} className="w-5 h-5" />
                    )}
                    {ctaData.text}
                  </Link>
                )}
              </motion.div>
            )}
          </div>

          {/* CTA ABAIXO DO CONTEÚDO (DESKTOP) */}
          {ctaData && ctaPosition === "below-content" && (
            <motion.div
              ref={ctaRef}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="hidden lg:flex justify-center mt-12"
            >
              {ctaData.use_form ? (
                <button
                  onClick={handleCtaClick}
                  className={getButtonClasses(ctaData.style) + " cursor-pointer"}
                >
                  {ctaData.showIcon && ctaData.icon && (
                    <Icon icon={ctaData.icon} className="w-5 h-5" />
                  )}
                  {ctaData.text}
                </button>
              ) : (
                <Link
                  href={ctaData.link}
                  className={getButtonClasses(ctaData.style)}
                >
                  {ctaData.showIcon && ctaData.icon && (
                    <Icon icon={ctaData.icon} className="w-5 h-5" />
                  )}
                  {ctaData.text}
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* MODAL COM FORMULÁRIO */}
      {typeof document !== "undefined" &&
        createPortal(
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
                  ref={modalContentRef}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Formulário de contato"
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Fechar modal"
                  >
                    <Icon
                      icon="solar:close-circle-linear"
                      className="w-5 h-5 text-gray-600"
                    />
                  </button>
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {ctaData?.form_html ? (
                      <div dangerouslySetInnerHTML={{ __html: ctaData.form_html }} />
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
};

export default ExploreDetails;
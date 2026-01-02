"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- DADOS (Substitua pelos seus logos reais) ---
const logosRow1 = [
  { src: "/logos/logo1.svg", alt: "Client 1", width: 120, height: 40 },
  { src: "/logos/logo2.svg", alt: "Client 2", width: 120, height: 40 },
  { src: "/logos/logo3.svg", alt: "Client 3", width: 120, height: 40 },
  { src: "/logos/logo4.svg", alt: "Client 4", width: 120, height: 40 },
  { src: "/logos/logo5.svg", alt: "Client 5", width: 120, height: 40 },
];

const logosRow2 = [
  { src: "/logos/logo6.svg", alt: "Client 6", width: 120, height: 40 },
  { src: "/logos/logo7.svg", alt: "Client 7", width: 120, height: 40 },
  { src: "/logos/logo8.svg", alt: "Client 8", width: 120, height: 40 },
  { src: "/logos/logo9.svg", alt: "Client 9", width: 120, height: 40 },
  { src: "/logos/logo10.svg", alt: "Client 10", width: 120, height: 40 },
];

// Multiplicamos os arrays para garantir o loop infinito sem buracos
const marquee1 = [...logosRow1, ...logosRow1, ...logosRow1, ...logosRow1];
const marquee2 = [...logosRow2, ...logosRow2, ...logosRow2, ...logosRow2];

export default function TrustSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    // 1. Título e Texto
    tl.fromTo(".reveal-trust", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    // 2. O Card de Logos (O Cofre)
    tl.fromTo(".trust-card", 
      { y: 50, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        ease: "power2.out",
        boxShadow: "0 0 50px -10px rgba(227, 27, 99, 0.1)" // Glow vermelho sutil ao entrar
      },
      "-=0.4"
    );

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 px-6 bg-[#020202] overflow-hidden border-t border-white/5"
    >
      
      {/* --- LAYER 1: Atmosfera --- */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      {/* Luz Vermelha de Fundo (Marketing Aggressive) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#E31B63]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* --- CABEÇALHO --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-3xl">
                <div className="reveal-trust mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/20 bg-rose-950/10 backdrop-blur-md">
                    <Icon icon="mdi:shield-check" className="text-[#E31B63] w-4 h-4" />
                    <span className="text-[11px] font-bold tracking-[0.2em] text-rose-100 uppercase">
                        Ecossistema Validado
                    </span>
                </div>
                <h2 className="reveal-trust text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                    Não testamos com o seu dinheiro. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63]">
                        Validamos com o deles.
                    </span>
                </h2>
            </div>
            
            {/* Stat de Autoridade */}
            <div className="reveal-trust hidden md:flex flex-col items-end border-l border-white/10 pl-8">
                <span className="text-5xl font-bold text-white tracking-tighter">+R$50M</span>
                <span className="text-sm text-gray-400 uppercase tracking-widest mt-1">Gerenciados em Ads</span>
            </div>
        </div>

        {/* --- THE VAULT (Card de Vidro com Logos) --- */}
        <div className="trust-card w-full rounded-[2rem] border border-white/10 bg-[#0A0A0A]/50 backdrop-blur-sm overflow-hidden relative group">
            
            {/* Brilho Vermelho na Borda (Hover) */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#E31B63]/20 rounded-[2rem] transition-colors duration-500 pointer-events-none z-20"></div>

            {/* Máscaras de Fade Laterais */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

            <div className="py-12 flex flex-col gap-10">
                
                {/* LINHA 1: Esquerda (Lento) */}
                <div className="flex w-full overflow-hidden">
                    <motion.div
                        className="flex items-center gap-16 md:gap-24"
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                    >
                        {marquee1.map((logo, i) => (
                           <LogoItem key={`row1-${i}`} logo={logo} />
                        ))}
                    </motion.div>
                </div>

                {/* LINHA 2: Direita (Lento) */}
                <div className="flex w-full overflow-hidden">
                    <motion.div
                        className="flex items-center gap-16 md:gap-24"
                        initial={{ x: "-50%" }}
                        animate={{ x: 0 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 45 }} // Velocidade diferente para naturalidade
                    >
                        {marquee2.map((logo, i) => (
                           <LogoItem key={`row2-${i}`} logo={logo} />
                        ))}
                    </motion.div>
                </div>

            </div>
        </div>
        
        {/* Footer do Card */}
        <div className="reveal-trust mt-6 flex justify-center opacity-60">
             <p className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E31B63] animate-pulse"></span>
                Empresas que escalaram acima de 7 dígitos/ano
             </p>
        </div>

      </div>
    </section>
  );
}

// Subcomponente para manter o código limpo
const LogoItem = ({ logo }: { logo: any }) => (
    <div className="relative group/logo cursor-pointer grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110">
        {/* Caso não tenha a imagem real, use um placeholder de texto ou SVG genérico */}
        <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="h-10 md:h-12 w-auto object-contain"
        />
        {/* Se não tiver imagens, descomente isso para testar: */}
        {/* <div className="h-10 md:h-12 w-32 bg-white/10 rounded flex items-center justify-center text-xs text-white">LOGO</div> */}
    </div>
);
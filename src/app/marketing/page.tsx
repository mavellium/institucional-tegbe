'use client';

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Video from "@/components/Video";
import Schema from "@/components/Schema";
import ChamadaAcao from "@/components/MKT/ChamadaAcao";
import Cards from "@/components/Cards";
import Animacao from "@/components/Animacao";
import AgenciasFalham from "@/components/Equipe/AgenciasFalham";
import Cards3 from "@/components/Cards/Cards3";
import ExploreDetails from "@/components/ExploreDetails";
import Empresas from "@/components/Equipe/Empresas";
import Expertise from "@/components/Expertise";
import Equipe from "@/components/MKT/Equipe";
import Companys from "@/components/MKT/Companys";
import { Footer } from "@/components/Footer";
import NaoEParaVoce from "@/components/NaoEParaVoce";

export default function marketing() {
    <Schema
        data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Marketing",
            provider: {
                "@type": "Organization",
                name: "Tegbe",
            },
        }}
    />
    return (
        <>
            <Header variant="marketing" />
            <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#020202] selection:bg-rose-500/30 pt-[80px] pb-[20px]">

                {/* --- CAMADA 1: Atmosfera & Profundidade --- */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                {/* Reduzimos o brilho de fundo para não "brigar" com o texto */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D90429]/15 rounded-full blur-[100px] opacity-40 mix-blend-screen pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020202] to-transparent z-10" />

                {/* --- CAMADA 2: Conteúdo --- */}
                <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">

                    {/* Badge: Menor e mais discreta */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/10 bg-rose-900/5 backdrop-blur-sm"
                    >
                        <Icon icon="mdi:check-decagram" className="text-[#FF0F43] w-3 h-3" />
                        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-rose-200/60 uppercase">
                            Kommo Gold Partner
                        </span>
                    </motion.div>

                    {/* Headline: Ajustada para "Senior Level" - Compacta e Direta */}
                    <div className="max-w-4xl mx-auto mb-6">
                        <h2 className="text-sm md:text-base font-medium text-gray-500 mb-3 tracking-widest uppercase">
                            O fim das métricas de vaidade
                        </h2>

                        <motion.h1
                            // Reduzi de text-9xl para text-6xl/7xl para limpar a visão
                            className="text-4xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tight text-white leading-[1.1]"
                        >
                            CONVERTA TRÁFEGO <br className="hidden sm:block" />
                            <span className="text-white drop-shadow-[0_0_20px_rgba(227,27,99,0.4)]">
                                EM RECEITA REAL.
                            </span>
                        </motion.h1>
                    </div>

                    {/* Subtítulo: Mais curto e direto ao ponto */}
                    <motion.p
                        className="max-w-xl mx-auto text-base text-gray-400 leading-relaxed mb-10 font-light"
                    >
                        Sem hacks. Sem promessas vazias. Apenas a engenharia exata para transformar cliques em contratos assinados no seu CRM.
                    </motion.p>

                    {/* CTA: Limpo */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <a href="#diagnostico" className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF0F43] to-[#990033] rounded-full opacity-30 blur-md group-hover:opacity-60 transition duration-500"></div>
                            
                            <Button className="relative px-8 py-4 rounded-full bg-[#E60045] text-white font-bold text-sm md:text-base tracking-wide hover:bg-[#ff1758] hover:scale-[1.01] active:scale-[0.99] transition-all border border-rose-500/20 flex items-center gap-2">
                                Estruturar meu Comercial
                                <Icon icon="lucide:arrow-right" className="w-4 h-4" />
                            </Button>
                        </a>
                        
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                            Agenda de Consultoria Aberta
                        </p>
                    </motion.div>

                </div>
            </section>
            <AgenciasFalham />
            <Video />
            <Cards3 />
            <ExploreDetails />
            <Empresas />
 <NaoEParaVoce/>
            <Expertise />
            <section className="relative w-full flex flex-col overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] 2xl:min-h-[900px]">
                {/* Imagem de fundo */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/Imagem.png"
                        alt="Background"
                        fill
                        className="w-full h-full object-cover object-right sm:object-top md:object-center lg:object-center"
                        loading="lazy"
                    />
                </div>

                {/* Efeito de escurecido (gradiente inferior) */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent 
        sm:from-black/70 sm:via-black/30 sm:to-transparent
        md:from-black/60 md:via-black/20 md:to-transparent
        lg:from-black/60 lg:via-transparent lg:to-transparent" />
            </section>
            <Equipe />
            <Companys />
            <ChamadaAcao />
            <Footer variant="marketing" />
        </>
    );
}
"use client";

import { useRef, useState, useCallback } from "react";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SalesEngineVisual() {
  // --- CORREÇÃO DE TIPAGEM AQUI ---
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const counterRef = useRef<HTMLHeadingElement>(null);
  // --------------------------------
  
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Atração", label: "O Anúncio" },
    { title: "Interesse", label: "O Clique" },
    { title: "Conversão", label: "O Pedido" },
    { title: "Logística", label: "O Envio" },
    { title: "Escala", label: "O Lucro" }
  ];

  // --- RESET TOTAL ---
  const resetStage = useCallback(() => {
    setActiveStep(0);
    
    // Limpeza Geral
    gsap.set([".obj-ad", ".cursor-hand", ".cube-wrapper", ".cube-shadow", ".shipping-label", ".obj-path-container", ".obj-destination", ".scale-stage", ".notif-card", ".scale-shockwave"], { clearProps: "all" });
    
    // Estados Iniciais - Padrão
    gsap.set(".stage-element", { opacity: 0, scale: 0 });
    gsap.set(".cursor-hand", { x: 100, y: 100, opacity: 0 });
    
    // Cubo
    gsap.set(".cube-wrapper", { 
        rotationY: -45, rotationX: -25, rotationZ: 0, 
        scale: 0.5, opacity: 0, x: 0, y: 0, z: -100,
        transformStyle: "preserve-3d"
    });
    gsap.set(".cube-shadow", { opacity: 0, scale: 0 });
    gsap.set(".shipping-label", { opacity: 0, scale: 1.5, z: 26 }); 
    
    // Logística
    gsap.set(".obj-path-line", { strokeDasharray: 400, strokeDashoffset: 400, opacity: 0 });
    gsap.set(".obj-destination", { scale: 0, opacity: 0, x: 280, y: -60 });
    
    // Setup Escala (Smartphone & Notificações)
    gsap.set(".scale-stage", { y: 100, opacity: 0, scale: 0.8, rotationX: 20 });
    gsap.set(".notif-card", { y: 50, opacity: 0, scale: 0.5, rotationX: -10 });
    gsap.set(".scale-shockwave", { scale: 0, opacity: 0 });
    if(counterRef.current) counterRef.current.innerText = "R$ 0,00";

  }, []);

  // --- SEQUÊNCIA DE ANIMAÇÃO ---
  const createAnimationSequence = useCallback(() => {
    const tl = gsap.timeline({ 
      onComplete: () => {
        gsap.delayedCall(3, () => { if(tlRef.current) tlRef.current?.restart(); });
      }
    });

    // 1. ATRAÇÃO
    tl.call(() => setActiveStep(0))
      .fromTo(".obj-ad", 
        { scale: 0, rotationX: 45, opacity: 0, y: 50 },
        { scale: 1, rotationX: 0, opacity: 1, y: 0, duration: 0.6, ease: "elastic.out(1, 0.6)" }
      )
      .fromTo(".shine-bar", { x: "-100%" }, { x: "200%", duration: 0.5, ease: "power2.inOut" }, "-=0.3")

    // 2. INTERESSE
    .call(() => setActiveStep(1))
    .to(".cursor-hand", { opacity: 1, x: 0, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.1")
    .to(".cursor-hand", { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
    .to(".obj-ad", { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }, "<")
    .to(".flash-overlay", { opacity: 0.2, duration: 0.05, yoyo: true, repeat: 1 }, "<")
    .to(".cursor-hand", { x: 200, y: 150, opacity: 0, duration: 0.2 })

    // 3. CONVERSÃO
    .call(() => setActiveStep(2))
    .to(".obj-ad", { rotationY: 90, opacity: 0, duration: 0.2, ease: "power2.in" })
    .to(".cube-wrapper", { 
      opacity: 1, scale: 1, z: 0, rotationY: -25, rotationX: -15, 
      duration: 0.6, ease: "back.out(1.2)" 
    }, "-=0.15")
    .to(".cube-shadow", { opacity: 1, scale: 1, duration: 0.4 }, "<")
    .to(".shipping-label", { opacity: 1, scale: 1, duration: 0.25, ease: "elastic.out(1, 0.5)" }, "-=0.2")

    // 4. LOGÍSTICA
    .call(() => setActiveStep(3))
    .to(".obj-destination", { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" })
    .to(".obj-path-line", { strokeDashoffset: 0, opacity: 0.4, duration: 0.5, ease: "power1.inOut" }, "<")
    .to(".cube-wrapper", { y: 10, scaleY: 0.9, scaleX: 1.1, duration: 0.15, ease: "power1.inOut" })
    .to(".cube-wrapper", { y: -60, z: 50, rotationX: -10, scale: 1.05, duration: 0.3, ease: "power1.out" })
    .to(".cube-shadow", { scale: 0.5, opacity: 0.5, duration: 0.3 }, "<")
    .to(".cube-wrapper", { 
        x: 280, y: -75, z: -300, rotationY: 180, rotationZ: 25, scale: 0.2, opacity: 0,
        duration: 0.5, ease: "power2.in"
    })
    .to(".cube-shadow", { x: 280, opacity: 0, duration: 0.5 }, "<")
    .to(".obj-destination", { scale: 1.4, duration: 0.1, yoyo: true, repeat: 1 }, "-=0.1")
    .to([".obj-destination", ".obj-path-line"], { opacity: 0, duration: 0.3, delay: 0.1 })


    // 5. ESCALA (Smartphone + Avalanche)
    .call(() => setActiveStep(4))
    .to(".scale-stage", { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 0.8, ease: "power3.out" })
    .to(".scale-shockwave", { scale: 2, opacity: 0.5, duration: 0.6, ease: "power1.out" }, "-=0.4")
    .to(".scale-shockwave", { opacity: 0, duration: 0.4 }, ">")
    .to(".notif-card", {
        y: (i) => -140 - (i * 65),
        z: (i) => i * 10,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "back.out(1.2)"
    }, "-=0.5")
    .to({}, {
        duration: 2,
        onUpdate: function() {
            const val = Math.floor(this.progress() * 145000);
            if(counterRef.current) counterRef.current.innerText = `R$ ${val.toLocaleString('pt-BR')}`;
        },
        ease: "power2.out"
    }, "-=1.5")
    .to(".scale-stage", { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 }, "-=0.5")

    // Cleanup
    .to(".scale-stage", { opacity: 0, y: -50, duration: 0.5, delay: 2 });

    return tl;
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;
    resetStage();
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 60%", end: "bottom 40%",
      onEnter: () => {
        if (tlRef.current) tlRef.current.kill();
        resetStage();
        tlRef.current = createAnimationSequence();
      },
      onLeave: () => tlRef.current?.pause(),
      onEnterBack: () => {
        if (tlRef.current) tlRef.current.kill();
        resetStage();
        tlRef.current = createAnimationSequence();
      },
      onLeaveBack: () => { tlRef.current?.pause(); resetStage(); }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-[#F4F4F4] overflow-hidden min-h-[900px] flex flex-col items-center justify-center relative select-none">
      
      <div className="flash-overlay fixed inset-0 bg-white pointer-events-none z-[100] opacity-0 mix-blend-overlay" />

      <div className="max-w-7xl w-full px-6 flex flex-col items-center">
        
        <div className="text-center mb-24">
          <span className="text-[#3483FA] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
            Engenharia de Conversão Tegbe
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-black">
            NÃO É SORTE.<br />
            É <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3483FA] to-blue-700">MÉTODO.</span>
          </h2>
        </div>

        {/* --- O PALCO 3D --- */}
        <div className="relative w-full h-[500px] flex items-center justify-center" style={{ perspective: "1200px" }}>
          
          {/* 1. ANÚNCIO (2D) */}
          <div className="obj-ad stage-element absolute w-80 h-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 z-20 flex flex-col gap-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                   <Icon icon="mdi:shopping-outline" width="24" />
                </div>
                <div className="space-y-2">
                   <div className="h-3 w-32 bg-gray-100 rounded-full" />
                   <div className="h-2 w-20 bg-gray-50 rounded-full" />
                </div>
             </div>
             <div className="flex-1 bg-gray-50 rounded-xl relative overflow-hidden flex items-center justify-center">
                <Icon icon="ph:sneaker-move-duotone" className="text-5xl text-gray-300" />
                <div className="shine-bar absolute top-0 left-0 w-16 h-full bg-white/60 skew-x-[-20deg]" />
             </div>
          </div>

          {/* 2. MOUSE */}
          <div className="cursor-hand absolute z-50 pointer-events-none drop-shadow-2xl">
             <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                <path d="M5.5 3.5L11.5 19.5L14.5 12.5L21.5 9.5L5.5 3.5Z" fill="#1a1a1a" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
             </svg>
          </div>

          {/* 3. A CAIXA 3D */}
          <div className="cube-shadow absolute w-40 h-8 bg-black/20 blur-md rounded-[50%] z-10 top-[200px]" />
          <div className="cube-wrapper absolute w-48 h-48 z-30" style={{ transformStyle: "preserve-3d" }}>
             <div className="absolute inset-0 bg-[#E0C097] border border-[#C5A075] flex items-center justify-center" style={{ transform: "translateZ(96px)" }}> 
                <div className="absolute inset-0 opacity-10 bg-[url('/texture-cardboard.png')] mix-blend-multiply" />
                <Icon icon="logos:mercadolibre" width="60" className="opacity-40 grayscale mix-blend-multiply" />
                <div className="shipping-label absolute w-32 h-20 bg-white shadow-md flex flex-col p-2 rotate-[-2deg] border-l-[6px] border-[#2D3277] backface-hidden">
                    <div className="flex justify-between items-center border-b pb-1 mb-1 border-gray-200">
                        <span className="text-[10px] font-black tracking-tighter text-[#2D3277]">FULL</span>
                        <Icon icon="ph:qr-code-bold" className="text-lg" />
                    </div>
                    <div className="space-y-1"><div className="h-1.5 w-full bg-black/80" /><div className="h-1.5 w-2/3 bg-black/40" /></div>
                </div>
                <div className="absolute top-0 w-full h-8 bg-[#D4B590]/50 blur-[1px] border-y border-white/20" />
             </div>
             <div className="absolute inset-0 bg-[#C5A075] border border-[#A88560]" style={{ transform: "rotateY(180deg) translateZ(96px)" }} />
             <div className="absolute inset-0 bg-[#8F6F4C] border border-[#755A3D]" style={{ transform: "rotateY(90deg) translateZ(96px)" }}>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 opacity-40"><Icon icon="ph:arrow-up-bold" className="text-[#3E2B18] text-5xl" /></div>
             </div>
             <div className="absolute inset-0 bg-[#8F6F4C] border border-[#755A3D]" style={{ transform: "rotateY(-90deg) translateZ(96px)" }} />
             <div className="absolute inset-0 bg-[#F5E1C8] border border-[#E0C097]" style={{ transform: "rotateX(90deg) translateZ(96px)" }} />
             <div className="absolute inset-0 bg-[#5E4225]" style={{ transform: "rotateX(-90deg) translateZ(96px)" }} />
          </div>

          {/* 4. LOGÍSTICA (Pino CORRIGIDO) */}
          <div className="obj-path-container absolute z-10 w-full h-full pointer-events-none">
              <div className="obj-destination absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ marginLeft: '280px', marginTop: '-60px' }}>
                  
                  {/* Container ajustado para o tamanho exato do ícone (60px) */}
                  <div className="relative w-[60px] h-[60px]">
                      {/* Ícone com tamanho travado */}
                      <Icon 
                        icon="ph:map-pin-fill" 
                        width="60" 
                        height="60" 
                        className="text-[#2D3277] drop-shadow-xl absolute top-0 left-0" 
                      />
                      {/* Bola Branca centralizada matematicamente */}
                      <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-inner" />
                  </div>

                  <div className="w-10 h-2 bg-black/20 blur-sm rounded-full mt-[-8px]" />
              </div>
              <svg className="absolute top-0 left-0 w-full h-full overflow-visible">
                 <path d="M 50% 50% Q 65% 30% 85% 42%" fill="none" stroke="#2D3277" strokeWidth="4" strokeDasharray="12 12" className="obj-path-line opacity-0"/>
              </svg>
          </div>

          {/* 5. ESCALA (Smartphone) */}
          <div className="scale-stage absolute z-40 flex flex-col items-center justify-end w-64 h-[400px]">
             <div className="scale-shockwave absolute bottom-0 w-full h-32 bg-[#FFD700] rounded-full blur-[80px]" />
             <div className="relative w-full h-full bg-[#0a0a0a] rounded-[2.5rem] border-[6px] border-[#222] shadow-2xl overflow-hidden flex flex-col">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-50" />
                <div className="pt-10 px-6 pb-4 bg-[#111] z-40 border-b border-gray-800">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Faturamento Hoje</span>
                    <h1 ref={counterRef} className="text-3xl font-black text-[#00E676] tracking-tighter mt-1">R$ 0,00</h1>
                </div>
                <div className="flex-1 relative w-full h-full px-4 perspective-[600px] flex items-end pb-8 justify-center">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="notif-card absolute w-full h-16 bg-[#1a1a1a] border border-[#333] rounded-xl p-3 flex items-center gap-3 shadow-lg origin-bottom">
                            <div className="w-10 h-10 rounded-full bg-[#00E676]/20 flex items-center justify-center text-[#00E676]">
                                <Icon icon="ph:currency-dollar-bold" className="text-xl" />
                            </div>
                            <div>
                                <div className="text-white text-xs font-bold">Venda Realizada</div>
                                <div className="text-gray-500 text-[10px]">Mercado Livre • Agora</div>
                            </div>
                            <div className="ml-auto text-[#00E676] font-bold text-xs">+R$ 289</div>
                        </div>
                    ))}
                </div>
             </div>
          </div>

        </div>

        {/* CONTROLES VISUAIS */}
        <div className="w-full max-w-4xl mt-32 relative">
          <div className="absolute top-[19px] left-0 w-full h-[2px] bg-gray-200 rounded-full" />
          <div className="absolute top-[19px] left-0 h-[2px] bg-black rounded-full transition-all duration-500" style={{ width: `${(activeStep / 4) * 100}%` }} />
          <div className="grid grid-cols-5 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className={`flex flex-col items-center transition-all z-10 duration-300 ${activeStep === i ? "opacity-100 scale-105" : "opacity-190"}`}>
                <div className={`w-10 h-10 rounded-full border-[3px] flex items-center justify-center bg-[#F4F4F4] z-50 transition-colors duration-300 ${activeStep >= i ? "border-black" : "border-gray-300"} ${activeStep === i ? "bg-black text-white" : ""}`}>
                  {activeStep > i ? <Icon icon="lucide:check" className="text-black" width="16" /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                <span className="mt-3 text-xs font-black uppercase tracking-widest text-black">{step.title}</span>
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mt-1">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <a aria-label="quero vender assim" href="#">
           <button aria-label="Quero vender assim" className="bg-black hover:bg-[#0071E3] text-white px-12 py-5 rounded-full font-black text-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-xl flex items-center gap-3">
              Quero Vender Assim
              <Icon icon="lucide:arrow-right" />
           </button>
           </a>
        </div>

      </div>
    </section>
  );
}
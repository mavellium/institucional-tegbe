"use client";

import { Icon } from "@iconify/react";

const CONTENT_DATA = {
  theme: {
    goldStart: "#FFD700",
    goldEnd: "#B8860B",
  },
  text: {
    headline: "Pare de deixar dinheiro",
    highlight: "na mesa.",
    description: "A estratégia está desenhada. A equipe está pronta. Só falta o seu \"sim\" para começarmos a escalar sua operação."
  },
  cta: {
    primary: {
      label: "Agendar Diagnóstico",
      href: "https://api.whatsapp.com/send?phone=5514988281001",
      icon: "solar:arrow-right-up-linear"
    },
    secondary: {
      label: "Conhecer Tegpro",
      href: "/cursos",
      icon: "solar:arrow-right-linear"
    }
  }
};

export default function FinalCtaSection() {
  // Desestruturando para facilitar o uso no JSX
  const { theme, text, cta } = CONTENT_DATA;

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* --- 1. AMBIÊNCIA (Branco Puro & Textura) --- */}
      
      {/* Grid Invertido Y */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fafafa_1px,transparent_1px),linear-gradient(to_top,#fafafa_1px,transparent_1px)] bg-[size:4rem_4rem] bg-bottom [mask-image:radial-gradient(ellipse_80%_70%_at_50%_100%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Glow e Noise sutis */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-amber-100/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-multiply pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full text-center space-y-10">
        
        {/* --- 2. TIPOGRAFIA --- */}
        
        <h2 className="text-5xl md:text-7xl font-bold text-[#050505] tracking-tighter leading-[1.05]">
          {text.headline} <br />
          
          {/* Destaque com Gradiente definido no JSON */}
          <span 
              className="text-transparent bg-clip-text drop-shadow-sm"
              style={{ backgroundImage: `linear-gradient(to right, ${theme.goldStart}, ${theme.goldEnd})` }}
          >
            {text.highlight}
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-xl mx-auto leading-relaxed whitespace-pre-line">
          {/* Dica: Use \n no JSON se quiser quebra de linha forçada */}
          {text.description}
        </p>

        {/* --- 3. BOTÕES (CTA) --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
            
            {/* Botão Principal */}
            <a 
              href={cta.primary.href} 
              className="group relative"
            >
              {/* Sombra Glow do Botão */}
              <div 
                  className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-40 blur-lg transition duration-500"
                  style={{ background: `linear-gradient(to right, ${theme.goldStart}, ${theme.goldEnd})` }}
              />
              
              <button className="relative bg-[#050505] text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 transform group-hover:scale-[1.02] flex items-center gap-4 border border-black">
                <span>{cta.primary.label}</span>
                
                {/* Ícone com Hover Dinâmico */}
                <div 
                    className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-colors duration-300 group-hover:text-black"
                    // Inline styles para usar as cores do JSON no hover via JS
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.goldStart}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                >
                    <Icon icon={cta.primary.icon} className="w-4 h-4" />
                </div>
              </button>
            </a>

            {/* Link Secundário */}
            <a 
                href={cta.secondary.href} 
                className="group flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors"
            >
                {cta.secondary.label}
                <Icon 
                    icon={cta.secondary.icon} 
                    className="group-hover:translate-x-1 transition-transform" 
                    style={{ color: theme.goldStart }}
                />
            </a>
        </div>

      </div>
    </section>
  );
}
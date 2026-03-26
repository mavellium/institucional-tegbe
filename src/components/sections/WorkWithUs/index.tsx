import Image from 'next/image';
import {  } from '@iconify/react';
import { Youtube, Facebook, Instagram } from 'lucide-react';

// Tipagem para os links de mídia social
interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  label: string;
}

// Configuração dos links de mídia social para fácil manutenção
const socialLinks: SocialLink[] = [
  { icon: Youtube, url: '#youtube', label: 'YouTube' },
  { icon: Facebook, url: '#facebook', label: 'Facebook' },
  { icon: Instagram, url: '#instagram', label: 'Instagram' },
];

export default function WorkWithUs() {
  return (
    <section className="bg-[#f0f1f3] py-20 px-4 md:px-10 lg:px-20 font-sans text-[#1a3a5f]">
      <div className="max-w-7xl mx-auto container">
        
        {/* Seção Superior: Texto e Imagem Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Bloco de Texto (Esquerda) */}
          <div className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-xl md:text-2xl font-light text-[#5a6e83]">
              Ficou com dúvida?
            </h2>
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#0d2137] leading-tight">
              Agende uma reunião
            </h1>
            <p className="text-lg text-[#5a6e83] max-w-2xl">
              Ainda restou alguma dúvida agende já uma reunião com um de nossos consultores.
            </p>
            
            {/* Botão Call-to-Action */}
            <a 
              href="#vagas" 
              className="inline-block bg-[#c19a6b] text-white font-semibold px-10 py-4 rounded-full text-lg shadow-md hover:bg-[#a6825a] transition-colors duration-300 transform hover:-translate-y-1"
            >
              Agendar Reunião
            </a>
          </div>

          {/* Bloco de Imagem Otimizada (Direita) */}
          <div className="w-full h-auto flex justify-center lg:justify-end">
            <div className="relative aspect-video w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/doni.jpg" // Caminho relativo na pasta public
                alt="Equipe TEGBE celebrando juntos com instrumentos e confetes"
                fill // Preenche o container relativo
                className="object-cover" // Mantém a proporção e cobre a área
                sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw" // Responsividade de carregamento
                priority // Carrega esta imagem com prioridade (acima da dobra)
              />
            </div>
          </div>
        </div>

        {/* Divisor Visual (Linha Fina) */}
        <div className="border-t border-[#d1d5db] w-full mb-12"></div>

        {/* Seção Inferior: Mídias Sociais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Texto de Chamada para Mídia */}
          <div className="text-center md:text-left space-y-2">
            <p className="text-sm font-medium text-[#c19a6b]">
              Mantenha-se atualizado
            </p>
            <h3 className="text-3xl font-bold text-[#0d2137]">
              Acompanhe nossas mídias
            </h3>
          </div>

          {/* Ícones de Mídia Social */}
          <div className="flex items-center justify-center md:justify-end gap-6">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`Siga-nos no ${link.label}`}
                className="flex items-center justify-center w-14 h-14 bg-[#c19a6b] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
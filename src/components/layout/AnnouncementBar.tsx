"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

// Tipagem para o componente
interface AnnouncementBarProps {
  // Conteúdo
  text?: string;
  linkText?: string;
  linkUrl?: string;
  
  // Ícone
  icon?: string;
  showIcon?: boolean;
  
  // Botão de ação
  buttonText?: string;
  buttonUrl?: string;
  showButton?: boolean;
  
  // Estilos
  variant?: "default" | "warning";
  backgroundColor?: string;
  textColor?: string;
  position?: "top" | "bottom" | "sticky-top" | "sticky-bottom";
  fullWidth?: boolean;
  
  // Comportamento
  autoClose?: number; // em milissegundos (0 = não fecha automaticamente)
  persistent?: boolean; // se true, não fecha mesmo após recarregar a página
  
  // Classes customizadas
  className?: string;
}

export default function AnnouncementBar({
  // Conteúdo com valores padrão
  text = "🚀 Promoção especial: 50% de desconto em todos os cursos!",
  linkText = "Saiba mais",
  linkUrl = "#",
  
  // Ícone
  icon = "ph:megaphone-simple-fill",
  showIcon = true,
  
  // Estilos
  variant = "warning",
  backgroundColor,
  textColor,
  position = "top",
  fullWidth = true,
  
  // Comportamento
  autoClose = 0,
  persistent = false,
  
  // Classes customizadas
  className = ""
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  // Fechar automaticamente após X milissegundos
  if (autoClose > 0) {
    setTimeout(() => {
      setIsVisible(false);
    }, autoClose);
  }
  
  // Salvar estado no localStorage se for persistente
  // const handleClose = () => {
  //   setIsVisible(false);
  //   if (persistent) {
  //     localStorage.setItem('announcement-bar-closed', 'true');
  //   }
  // };
  
  // Verificar se foi fechado anteriormente
  if (persistent && typeof window !== 'undefined') {
    const wasClosed = localStorage.getItem('announcement-bar-closed');
    if (wasClosed === 'true') {
      return null;
    }
  }
  
  if (!isVisible) return null;
  
  // Mapeamento de variantes para classes
  const variantClasses = {
    default: "bg-white text-gray-800 border-b border-gray-200",
    warning: "bg-yellow-500 text-gray-900 border-b border-yellow-600",
  };
  
  // Mapeamento de posições
  const positionClasses = {
    top: "top-0 left-0 right-0",
    bottom: "bottom-0 left-0 right-0",
    "sticky-top": "sticky top-0 left-0 right-0 z-50",
    "sticky-bottom": "sticky bottom-0 left-0 right-0 z-50"
  };
  
  // Mapeamento de cores do botão baseado na variante
  const getButtonVariant = () => {
    switch(variant) {
      case "default": return "secondary";
      case "warning": return "default";
      default: return "default";
    }
  };

  return (
    <div 
      className={`
        ${className}
        ${positionClasses[position]}
        ${fullWidth ? "w-full" : "container mx-auto"}
        px-4 py-3
        ${variantClasses[variant]}
        flex items-center justify-between
        transition-all duration-300
        shadow-md
        animate-fade-in-down
        z-40
      `}
      style={{
        backgroundColor: backgroundColor && variant === "default" ? backgroundColor : undefined,
        color: textColor ? textColor : undefined,
      }}
      role="alert"
      aria-live="polite"
    >
      {/* Conteúdo à esquerda */}
      <div className="flex justify-center mx-auto items-center gap-3">
        {/* Ícone */}
        {showIcon && icon && (
          <Icon 
            icon={icon} 
            className="w-5 h-5 flex-shrink-0"
          />
        )}
        
        {/* Texto */}
        <div className="flex flex-wrap items-center gap-2 text-start text-sm font-medium">
          <span>{text}</span>
          
          {/* Link opcional */}
          {linkText && linkUrl && (
            <Link 
              href={linkUrl}
              className={`
                font-bold w-full sm:w-auto underline underline-offset-2 hover:opacity-80 transition-opacity
                ${variant === "warning" ? "text-gray-900" : "text-white"}
              `}
            >
              {linkText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// Adicione este CSS global ou no seu arquivo tailwind.config.js
// Para a animação fade-in-down
const styles = `
@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.3s ease-out;
}
`;
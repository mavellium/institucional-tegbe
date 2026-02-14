"use client";

import { HeaderContent } from './types';
import { ServiceTheme } from './types';

interface ServiceHeaderProps {
  content: HeaderContent;
  theme: ServiceTheme;
  variant: string;
}

export default function ServiceHeader({ content, theme, variant }: ServiceHeaderProps) {
  // Determina qual HTML usar no título
  const getTitleHtml = () => {
    if (variant === 'marketing' && content.gradientTitle) {
      return content.gradientTitle;
    }
    return content.title;
  };

  return (
    <div className={`mb-16 text-center section-title will-change-transform ${variant === 'marketing' ? 'mb-20' : ''}`}>
      {/* Badge para marketing */}
      {variant === 'marketing' && content.preTitle && (
        <div className="inline-block mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
            {content.preTitle}
          </span>
        </div>
      )}

      {/* Badge para sobre */}
      {variant === 'sobre' && content.preTitle && (
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#0071E3]"></span>
          <span className="text-xs font-bold text-gray-500 tracking-wide uppercase">
            {content.preTitle}
          </span>
        </div>
      )}

      {/* Título */}
      <h2 
        className={`text-4xl md:text-5xl ${variant === 'marketing' ? 'lg:text-6xl' : 'lg:text-5xl'} font-bold tracking-tight mb-4 ${theme.text.title}`}
        dangerouslySetInnerHTML={{
          __html: getTitleHtml()
        }}
      />

      {/* Subtítulo */}
      {content.subtitle && (
        <p className={`text-lg max-w-2xl mx-auto ${theme.text.secondary} ${variant === 'sobre' ? 'hidden' : ''}`}>
          {content.subtitle}
        </p>
      )}
    </div>
  );
}
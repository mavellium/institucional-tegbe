"use client";

import { Badge } from '@/components/ui/badge';
import { HeaderContent, ServiceTheme } from './types';
import Heading from '@/components/ui/heading';
import RichText from '@/components/ui/rich/richText';
import Paragrafo from '@/components/ui/paragrafo';

interface ServiceHeaderProps {
  content: HeaderContent;
  theme: ServiceTheme;
  variant: string;
}

export default function ServiceHeader({ content, theme, variant }: ServiceHeaderProps) {
  
console.log("TITLE:", content.title)
  return (
    <div className={`mb-16 text-center section-title will-change-transform ${variant === 'marketing' ? 'mb-20' : ''}`}>
      
      {/* Badge seguindo seu padrão */}
      {content.preTitle && (
        <div className="mb-4">
          <Badge 
            variant={variant === 'marketing' ? 'outline' : 'secondary'}
            className="uppercase tracking-widest font-bold text-xs px-3 py-1"
          >
            {variant === 'sobre' && <span className="w-2 h-2 mr-2 rounded-full bg-primary" />}
            {content.preTitle}
          </Badge>
        </div>
      )}

      {/* Heading usando o RichText interno para processar o Array da API */}
      <Heading
        as="h2"
        font="medium"
        className={`max-w-[800px] mx-auto ${theme.text.title}`}
      >
        <RichText content={content.title} />
      </Heading>

      {/* Subtítulo usando seu componente de texto */}
      {content.subtitle && variant !== 'sobre' && (
        <Paragrafo
          className={`max-w-2xl mx-auto mt-4 ${theme.text.secondary}`}
        >
          {content.subtitle}
        </Paragrafo>
      )}
    </div>
  );
}
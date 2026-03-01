import { useState, useEffect } from 'react';
import { VariantContent, ServiceFlowVariant } from '../types';
import { CONTENT as FALLBACK_CONTENT } from '../constants/content';

export function useServiceFlowContent(variant: ServiceFlowVariant) {
  const [content, setContent] = useState<VariantContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api-tegbe/tegbe-institucional/cards');
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const allVariants = await response.json();

        if (allVariants?.[variant]) {
          setContent(allVariants[variant]);
          setUseFallback(false);
        } else {
          console.warn(`Dados não encontrados para variante: ${variant}. Usando fallback.`);
          setContent(FALLBACK_CONTENT[variant]);
          setUseFallback(true);
        }
      } catch (err) {
        console.error('Erro no carregamento de dados:', err);
        setError(err instanceof Error ? err : new Error('Erro desconhecido'));
        setContent(FALLBACK_CONTENT[variant]);
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [variant]);

  return { content, loading, error, useFallback };
}
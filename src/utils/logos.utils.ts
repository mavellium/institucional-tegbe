import { LogosApiData } from "@/types/logos.type";


export const findLogosInObject = (obj: any): any[] => {
  if (!obj) return [];
  if (Array.isArray(obj)) {
    const logos = obj.filter(item => item && item.image && typeof item.image === 'string');
    if (logos.length > 0) return logos;
    for (const item of obj) {
      const result = findLogosInObject(item);
      if (result.length > 0) return result;
    }
    return [];
  }
  if (typeof obj === 'object') {
    for (const key in obj) {
      const result = findLogosInObject(obj[key]);
      if (result.length > 0) return result;
    }
  }
  return [];
};

export const extractLogosFromAPI = (result: any): LogosApiData[] => {
  // Tenta caminhos comuns primeiro
  const dataArray = result?.values?.values || result?.values || result?.data || (Array.isArray(result) ? result : null);
  
  if (Array.isArray(dataArray)) {
    const logos = dataArray.filter((item: any) => item?.image);
    if (logos.length > 0) {
      return logos.map((item: any, index: number) => ({
        id: item.id || `logo-${index}`,
        src: item.image,
        alt: item.name || item.title || "Logo",
        width: 150,
        height: 100,
        url: item.url || item.website || item.link || '#',
      }));
    }
  }
  
  // Fallback para busca profunda
  return findLogosInObject(result).map((item, index) => ({
    id: item.id || `found-${index}`,
    src: item.image,
    alt: item.name || "Logo",
    width: 150,
    height: 100,
    url: item.url || '#',
  }));
};
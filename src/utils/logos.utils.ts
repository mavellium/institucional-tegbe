import { LogosApiData } from "@/types/logos.type";
import { ILogo } from "@/interface/imagem/ILogo";

export const findLogosInObject = (obj: any): ILogo[] => {
  if (!obj) return [];
  if (Array.isArray(obj)) {
    const logos = obj.filter(item => item && item.image && typeof item.image === "string");
    if (logos.length > 0) return logos;
    for (const item of obj) {
      const result = findLogosInObject(item);
      if (result.length > 0) return result;
    }
    return [];
  }
  if (typeof obj === "object") {
    for (const key in obj) {
      const result = findLogosInObject(obj[key]);
      if (result.length > 0) return result;
    }
  }
  return [];
};

export const extractLogosFromAPI = (result: any): LogosApiData[] => {
  const dataArray = result?.values?.values || result?.values || result?.data || (Array.isArray(result) ? result : null);

  if (Array.isArray(dataArray)) {
    const logos: ILogo[] = dataArray
      .filter((item: any) => item?.image)
      .map((item: any, index: number) => ({
        id: item.id || `logo-${index}`,
        image: item.image, // ⚠ precisa ser "image" para ILogo
        name: item.name || item.title || "Logo",
        alt: item.alt || item.name || "Logo",
        url: item.url || item.website || item.link || "#",
        width: 150,
        height: 100,
      }));

    if (logos.length > 0) return [{ values: logos }];
  }

  // fallback para busca profunda
  const found: ILogo[] = findLogosInObject(result).map((item: any, index: number) => ({
    id: item.id || `found-${index}`,
    image: item.image,
    name: item.name || "Logo",
    alt: item.alt || item.name || "Logo",
    url: item.url || "#",
    width: 150,
    height: 100,
  }));

  return found.length > 0 ? [{ values: found }] : [];
};
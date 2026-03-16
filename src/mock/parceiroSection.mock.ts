import { IParceiroSection } from "@/interface/parceiro/IParceiroSection";

export const parceiroSectionMock: IParceiroSection = {
  badge: [
    { type: "text", value: "Parceiros Estratégicos" }
  ],

  title: [
    { type: "text", value: "Trabalhamos com quem " },
    { type: "highlight", value: "domina o mercado.", color: "#F9396F" }
  ],

  description: [
    {
      type: "text",
      value: "Unimos forças com especialistas que elevam o nível das empresas."
    }
  ],

  parceiros: [
    {
      id: 1,
      nome: "João Branco",
      cargo: "Ex-CMO do McDonald's",
      depoimento: [
        {type: "text", value:"Top 10 profissionais de marketing no Brasil pela Forbes. Considerado CMO mais eficaz do país pela Scopen."}],
      img_principal: "/dev/foto_card.avif",
      img_principal_alt: "João Branco",

      img_nome: "/dev/foto_nome_card.avif",
      img_nome_alt: "Ferrero",

      img_logo: "/dev/foto_logo_card.avif",
      img_logo_alt: "McDonald's"
    },
    {
      id: 1,
      nome: "Vinícius",
      cargo: "Ex-CMO do McDonald's",
      depoimento: [{type: "text", value:"Top 10 profissionais de marketing no Brasil pela Forbes. Considerado CMO mais eficaz do país pela Scopen."}],
      img_principal: "/dev/foto_card.avif",
      img_principal_alt: "João Branco",

      img_nome: "/dev/foto_nome_card.avif",
      img_nome_alt: "Ferrero",

      img_logo: "/dev/foto_logo_card.avif",
      img_logo_alt: "McDonald's"
    }
  ],

  button: {
    label: "Quero me tornar parceiro",
    variant: "marketing",
    size: "lg",
    action: "link",
    link: "/contato",
    target: "_self"
  },
  msgFinal: "Vagas limitadas para consultoria estratégica"
};
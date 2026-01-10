import { VariantContent } from '../types';

export const CONTENT: Record<string, VariantContent> = {
  home: {
    header: {
      preTitle: "",
      title: "Como fazemos você vender",
      subtitle: "Metodologia validada em mais de R$ 40 milhões faturados."
    },
    services: [
      {
        step: "01",
        id: "seo",
        title: "SEO de Conversão",
        description: "Não criamos apenas anúncios, criamos máquinas de vendas. Títulos e descrições otimizados para que o cliente te encontre e compre sem hesitar.",
        icon: "lucide:search-code",
        color: "#0071E3",
        wide: false,
        visualType: "graph"
      },
      {
        step: "02",
        id: "ads",
        title: "Tráfego que Dá Lucro",
        description: "Gestão de Ads focada em ROI. Colocamos seu investimento onde o retorno é certo, acelerando o giro de estoque e multiplicando suas vendas.",
        icon: "lucide:trending-up",
        color: "#0071E3",
        wide: false,
        visualType: "graph"
      },
      {
        step: "03",
        id: "blindagem",
        title: "Operação Blindada",
        description: "Cuidamos da sua reputação para que nada pare o seu crescimento. No Mercado Livre e na Shopee, medalha no peito é sinônimo de mais dinheiro no bolso.",
        icon: "lucide:shield-check",
        color: "#FFD700",
        wide: true,
        visualType: "medal"
      }
    ]
  },
  marketing: {
    header: {
      preTitle: "O Padrão Tegbe",
      title: "Não é mágica.<br />É Metodologia.",
      gradientTitle: "Não é mágica.<br /><span class='text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#A30030]'>É Metodologia.</span>",
      subtitle: "O tripé estratégico que sustenta operações de alta performance."
    },
    services: [
      {
        step: "01",
        id: "traffic",
        title: "Tráfego de Elite",
        description: "Não buscamos cliques, buscamos decisores. Segmentação cirúrgica para atrair quem pode pagar.",
        icon: "mdi:target-account",
        color: "#FF0F43",
        wide: false,
        visualType: "traffic"
      },
      {
        step: "02",
        id: "crm",
        title: "Engenharia de CRM",
        description: "Implementação oficial Kommo. Transformamos seu funil em uma linha de produção previsível.",
        icon: "mdi:sitemap",
        color: "#E31B63",
        wide: false,
        visualType: "crm"
      },
      {
        step: "03",
        id: "scale",
        title: "IA & Otimização",
        description: "Automação que trabalha enquanto você dorme. Dashboards de receita em tempo real e atendimento via IA.",
        icon: "mdi:robot-industrial",
        color: "#D90429",
        wide: true,
        visualType: "scale"
      }
    ]
  },
  sobre: {
    header: {
      preTitle: "Nosso Modus Operandi",
      title: "A engenharia por trás<br/>da nossa excelência.",
      subtitle: "",
      gradientTitle: ""
    },
    services: [
      {
        step: "01",
        id: "tracking",
        title: "Rastreabilidade Total",
        description: "Eliminamos a intuição. Antes de gastar R$ 1, implementamos um ecossistema de rastreamento (GA4 + Server Side). Se o dado não existe, a decisão não é tomada.",
        icon: "ph:chart-bar-bold",
        color: "#0071E3",
        wide: false,
        visualType: "bar-chart"
      },
      {
        step: "02",
        id: "efficiency",
        title: "Eficiência de Capital",
        description: "Não buscamos apenas cliques; buscamos margem. Nossa engenharia foca em fazer o estoque girar e transformar visitantes em fluxo de caixa líquido.",
        icon: "ph:rocket-launch-bold",
        color: "#0071E3",
        wide: false,
        visualType: "trend-line"
      },
      {
        step: "03",
        id: "governance",
        title: "Governança Radical",
        description: "Fim das caixas pretas. Você acessa o mesmo dashboard que nós. Tratamos seu budget com a seriedade e a transparência de um fundo de investimento.",
        icon: "ph:shield-check-bold",
        color: "#1d1d1f",
        wide: true,
        visualType: "dashboard"
      }
    ]
  }
};
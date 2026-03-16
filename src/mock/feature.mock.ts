import { FeatureSectionData } from "@/interface/feature/IFeatureSection";

export const mockData: FeatureSectionData = {
  header: {
    title: [
      { type: "text", value: "Conheça nossas soluções" }
    ],
    subtitle: [
      { type: "text", value: "Tudo que seu negócio precisa para vender mais" }
    ]
  },

  items: [
    {
      id: "service-1",
      icon: "lucide:target",
      image: "https://tegbe-cdn.b-cdn.net/uploads/1770689972071-1.png",
      title: [{ type: "text", value: "Gestão Estratégica" }],
      description: [
        {
          type: "text",
          value:
            "Planejamento e condução estratégica do marketing com foco no crescimento da empresa e no melhor aproveitamento do investimento."
        }
      ]
    },

    {
      id: "service-1769472907843",
      icon: "mdi:rocket-launch",
      image: "https://tegbe-cdn.b-cdn.net/uploads/1770689977970-2.png",
      title: [{ type: "text", value: "Gestão de Mídia Paga" }],
      description: [
        {
          type: "text",
          value:
            "Gestão de campanhas de anúncios nas principais plataformas digitais para aumentar visibilidade, leads e vendas."
        }
      ]
    },

    {
      id: "service-1769472942396",
      icon: "mdi:check-decagram",
      image: "https://tegbe-cdn.b-cdn.net/uploads/1770689985685-3.png",
      title: [{ type: "text", value: "Produção de Criativos" }],
      description: [
        {
          type: "text",
          value:
            "Desenvolvimento completo de criativos para anúncios, do planejamento à entrega final, com foco em conversão e resultado."
        }
      ]
    },

    {
      id: "service-1769473004799",
      icon: "lucide:message-square",
      image: "https://tegbe-cdn.b-cdn.net/uploads/1770689993342-4.png",
      title: [{ type: "text", value: "Implementação de CRM" }],
      description: [
        {
          type: "text",
          value:
            "Estruturação e gestão do CRM para organizar o processo comercial e melhorar o relacionamento com clientes."
        }
      ]
    },

    {
      id: "service-1769473018835",
      icon: "lucide:zap",
      image: "https://tegbe-cdn.b-cdn.net/uploads/1770690001074-5.png",
      title: [{ type: "text", value: "Agentes de IA" }],
      description: [
        {
          type: "text",
          value:
            "Criação de agentes de inteligência artificial para automatizar atendimentos e processos comerciais."
        }
      ]
    },

    {
      id: "service-1769473036771",
      icon: "mdi:open-in-new",
      image: "https://tegbe-cdn.b-cdn.net/uploads/1770690006788-6.png",
      title: [{ type: "text", value: "Página de Conversão" }],
      description: [
        {
          type: "text",
          value:
            "Criação de páginas estratégicas com foco em engajamento e conversão."
        }
      ]
    }
  ],

  button: {
    label: "CONTRATAR AGORA",
    link: "https://wa.me/5514988281001",
    action: "link",
    variant: "marketing"
  }
};
import { ServiceTheme } from '../types';

export const THEMES: Record<string, ServiceTheme> = {
  home: {
    background: "bg-[#f4f4f4]",
    text: {
      primary: "text-black",
      secondary: "text-gray-500",
      card: "text-gray-600",
      title: "text-black"
    },
    card: {
      background: "bg-white",
      border: "border-gray-200/50",
      hover: "hover:shadow-xl hover:border-gray-300",
      wideBackground: "bg-white"
    },
    accent: "#FFD700",
    badge: {
      background: "bg-gray-50",
      color: "#0071E3"
    }
  },
  ecommerce: {
    background: "bg-[#F4F4F4]",
    text: {
      primary: "text-black",
      secondary: "text-gray-600",
      card: "text-gray-600",
      title: "text-[#0071E3]"
    },
    card: {
      background: "bg-white",
      border: "border-gray-200",
      hover: "hover:shadow-lg hover:border-[#0071E3]/30",
      wideBackground: "bg-white"
    },
    accent: "#0071E3",
    badge: {
      background: "bg-[#0071E3]/10",
      color: "#0071E3"
    }
  },
  marketing: {
    background: "bg-[#020202] border-t border-white/5",
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
      card: "text-gray-400",
      title: "text-white"
    },
    card: {
      background: "bg-[#0A0A0A]",
      border: "border-white/10",
      hover: "hover:border-rose-500/30 hover:shadow-[0_0_30px_rgba(227,27,99,0.1)]",
      wideBackground: "bg-[#0A0A0A]"
    },
    accent: "#E31B63",
    badge: {
      background: "bg-white/5 border border-white/10",
      color: "#E31B63"
    }
  },
  sobre: {
    background: "bg-[#F5F5F7]",
    text: {
      primary: "text-[#1d1d1f]",
      secondary: "text-gray-500",
      card: "text-gray-500",
      title: "text-[#1d1d1f]"
    },
    card: {
      background: "bg-white",
      border: "border-white",
      hover: "hover:border-[#0071E3]/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]",
      wideBackground: "bg-white"
    },
    accent: "#0071E3",
    badge: {
      background: "bg-[#F5F5F7] text-[#1d1d1f]",
      color: "#0071E3"
    }
  }
};
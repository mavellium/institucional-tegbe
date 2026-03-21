'use client';

import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { ShoppingCart, Megaphone, GraduationCap, Wrench, ArrowDown } from 'lucide-react';

// Dados estáticos movidos para fora do componente
const CARDS = [
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'Venda nos maiores marketplaces do Brasil',
    gradient: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Marketing',
    description: 'Domine as redes sociais e conquiste clientes',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'formacoes',
    icon: GraduationCap,
    title: 'Formações',
    description: 'Aprenda presencialmente com especialistas',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'ferramentas',
    icon: Wrench,
    title: 'Ferramentas',
    description: 'Tecnologia para alavancar suas vendas',
    gradient: 'from-violet-500 to-purple-700',
  },
];

// Define a curva de easing customizada
const customEasing: Easing = [0.22, 1, 0.36, 1];

// Variantes de animação com tipagem correta
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: customEasing,
    },
  },
};

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
      aria-label="Seção principal de soluções"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-primary opacity-[0.03]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      {/* Texto principal */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 relative z-10"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary-foreground text-sm font-medium mb-6 border border-secondary/20">
          Soluções Completas para o Seu Negócio
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight max-w-3xl mx-auto">
          Cresça no{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
            Digital
          </span>{' '}
          com Estratégia
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Escolha a área que deseja explorar e descubra como podemos transformar os seus resultados.
        </p>
      </motion.div>

      {/* Grid de cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl w-full relative z-10"
      >
        {CARDS.map((card) => (
          <motion.button
            key={card.id}
            variants={itemVariants}
            onClick={() => scrollTo(card.id)}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-card rounded-xl p-6 text-left shadow-sm border border-border/60 hover:shadow-xl hover:border-border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={`Explorar ${card.title}`}
          >
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-lg`}
              aria-hidden="true"
            >
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">{card.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            <ArrowDown
              className="w-4 h-4 text-muted-foreground/40 absolute bottom-4 right-4 group-hover:text-foreground/60 group-hover:translate-y-1 transition-all duration-300"
              aria-hidden="true"
            />
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}
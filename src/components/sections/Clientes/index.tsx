"use client";

import { SectionContent } from "@/types/testimonial.type";
import CompanysSection from "@/components/ui/company/companySection";

interface ClientesProps {
  data: SectionContent | null;
}

export function Clientes({ data }: ClientesProps) {
  if (!data) return null;

  return <CompanysSection data={data} />;
}

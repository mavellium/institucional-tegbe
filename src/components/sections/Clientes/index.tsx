"use client";

import { SectionContent } from "@/types/testimonial.type";
import CompanysSection from "@/components/ui/company/companySection";
import { useApi } from "@/hooks/useApi";

interface ClientesProps {
    endpoint: string;
}

export function Clientes({ endpoint }: ClientesProps) {
    const { data } = useApi<SectionContent>(endpoint);
    if (!data) return null;

    return <CompanysSection data={data} />;
}
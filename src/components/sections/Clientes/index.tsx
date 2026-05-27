"use client";

import { SectionContent } from "@/types/testimonial.type";
import CompanysSection from "@/components/ui/company/companySection";
import { useApi } from "@/hooks/useApi";

interface ClientesProps {
    endpoint?: string;
    data?: SectionContent;
}

export function Clientes({ endpoint = "", data: dataProp }: ClientesProps) {
    const { data: fetched } = useApi<SectionContent>(dataProp ? "" : endpoint);
    const data = dataProp ?? fetched;
    if (!data) return null;

    return <CompanysSection data={data} />;
}
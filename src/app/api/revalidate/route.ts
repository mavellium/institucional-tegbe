import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // 1. SEGURANÇA: Agora olhamos o Header em vez da URL!
    const token = req.headers.get("x-webhook-secret");

    if (token !== process.env.REVALIDATION_SECRET) {
      console.warn("Tentativa não autorizada de revalidação.");
      return Response.json({ error: "Não autorizado" }, { status: 401 });
    }

    // 2. PARSE SEGURO: Evita erro 500 se o body não for JSON válido
    let body;
    try {
      body = await req.json();
    } catch (err) {
      return Response.json({ error: "Formato JSON inválido" }, { status: 400 });
    }

    const slug = body.slug;
    if (!slug) {
      return Response.json({ error: "O slug é obrigatório" }, { status: 400 });
    }

    console.log(`✅ REVALIDANDO CACHE: cms:${slug}`);
    revalidateTag(`cms:${slug}`, { expire: 0 });

    return Response.json({ ok: true, revalidated_tag: `cms:${slug}`, time: Date.now() });
  } catch (error) {
    console.error("❌ Erro interno no webhook de revalidação:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return Response.json(
      { error: "Erro ao processar o webhook", details: errorMessage },
      { status: 500 }
    );
  }
}

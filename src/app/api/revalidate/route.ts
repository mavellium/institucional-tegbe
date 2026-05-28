import { revalidateTag, revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // 1. SEGURANÇA: Agora olhamos o Header em vez da URL!
    const token = req.headers.get("x-revalidate-token");

    if (token !== process.env.WEBHOOK_SECRET) {
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

    console.log(`✅ REVALIDANDO CACHE para slug: "${slug}"`);
    // Janus sends the tenant slug (e.g. "tegbe") via revalidateSites(companySlug),
    // not the individual post/page slug. We bust the full blog tree unconditionally
    // so any CMS change (post or headless page) is reflected immediately.
    revalidateTag("cms:blog", { expire: 0 }); // list, categories, tags, getPage("blog")
    revalidateTag(`cms:blog:${slug}`, { expire: 0 }); // post detail (no-op if slug is tenant slug)
    revalidateTag(`cms:${slug}`, { expire: 0 }); // headless pages tagged by slug
    revalidatePath("/blog", "layout"); // all /blog/* pages

    return Response.json({
      ok: true,
      revalidated: [`cms:blog`, `cms:blog:${slug}`, `cms:${slug}`],
      path: "/blog",
      time: Date.now(),
    });
  } catch (error) {
    console.error("❌ Erro interno no webhook de revalidação:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return Response.json(
      { error: "Erro ao processar o webhook", details: errorMessage },
      { status: 500 }
    );
  }
}

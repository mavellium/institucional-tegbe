import { revalidateTag } from "next/cache";

// Garante que a rota não será cacheada (essencial para webhooks)
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const slug = body.slug;

    if (!slug) {
      return Response.json({ error: "O slug é obrigatório" }, { status: 400 });
    }

    console.log("REVALIDANDO:", `cms:${slug}`);

    // No Next.js 16, passamos { expire: 0 } para forçar a expiração instantânea
    revalidateTag(`cms:${slug}`, { expire: 0 });

    return Response.json({ ok: true, revalidated_tag: `cms:${slug}`, time: Date.now() });
  } catch (error) {
    return Response.json({ error: "Erro ao processar o webhook" }, { status: 500 });
  }
}

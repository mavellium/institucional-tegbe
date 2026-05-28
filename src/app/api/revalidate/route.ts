import { revalidateTag, revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

const ALL_TAGS = [
  "cms:home",
  "cms:ecommerce",
  "cms:marketing",
  "cms:formacoes",
  "cms:sobre",
  "cms:blog",
];

const ALL_PATHS = ["/", "/ecommerce", "/marketing", "/formacoes", "/sobre", "/blog"];

function revalidateAll(slug?: string) {
  for (const tag of ALL_TAGS) {
    revalidateTag(tag, {});
  }
  if (slug) {
    revalidateTag(`cms:${slug}`, {});
    revalidateTag(`cms:blog:${slug}`, {});
  }
  for (const path of ALL_PATHS) {
    revalidatePath(path, "page");
  }
  revalidatePath("/blog/[slug]", "page");
}

export async function POST(req: Request) {
  try {
    const token = req.headers.get("x-revalidate-token");
    console.log(
      `[revalidate] POST recebido - token presente: ${!!token} - token value: "${token?.slice(0, 8)}..."`
    );
    if (token !== process.env.WEBHOOK_SECRET) {
      console.warn(
        `[revalidate] 401 - token inválido. Recebido: "${token?.slice(0, 8)}..." Esperado começa com: "${process.env.WEBHOOK_SECRET?.slice(0, 8)}..."`
      );
      return Response.json({ error: "Não autorizado" }, { status: 401 });
    }

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch {
      // body opcional — revalida tudo mesmo sem body
    }

    const slug = typeof body.slug === "string" ? body.slug : undefined;
    console.log(`[revalidate] ✅ webhook recebido slug="${slug}" body=${JSON.stringify(body)}`);

    revalidateAll(slug);

    return Response.json({
      ok: true,
      slug,
      revalidated_tags: ALL_TAGS,
      revalidated_paths: [...ALL_PATHS, "/blog/[slug]"],
      time: Date.now(),
    });
  } catch (error) {
    console.error("[revalidate] ❌ erro interno:", error);
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return Response.json(
      { error: "Erro ao processar o webhook", details: message },
      { status: 500 }
    );
  }
}

// Endpoint de teste — chame no browser:
// /api/revalidate?token=SEU_WEBHOOK_SECRET
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (token !== process.env.WEBHOOK_SECRET) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }
  revalidateAll();
  console.log("[revalidate] ✅ revalidação manual via GET");
  return Response.json({
    ok: true,
    revalidated_tags: ALL_TAGS,
    revalidated_paths: [...ALL_PATHS, "/blog/[slug]"],
    time: Date.now(),
  });
}

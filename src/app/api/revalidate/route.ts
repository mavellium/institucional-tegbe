import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const body = await req.json();
  const slug = body.slug;

  if (!slug) {
    return Response.json({ error: "slug is required" }, { status: 400 });
  }

  console.log("REVALIDANDO:", slug);

  revalidateTag(`cms:${slug}`, "max");

  return Response.json({ ok: true, slug });
}

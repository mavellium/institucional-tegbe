import { revalidateTag } from "next/cache";

export async function POST() {
  console.log("REVALIDANDO CACHE");
  revalidateTag("cms", "max");

  return Response.json({ ok: true });
}

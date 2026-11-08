/**
 * Punto ÚNICO de corrección de consultas (se llama solo cuando Algolia devuelve 0 resultados).
 *
 *  - Si existen AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_KEY y AZURE_OPENAI_DEPLOYMENT (.env.local),
 *    corrige con Azure OpenAI. La llave queda en el servidor y nunca llega al navegador.
 *  - Si no están, o Azure falla, usa el corrector local sobre el vocabulario controlado.
 *
 * La corrección solo REESCRIBE la consulta; la búsqueda la sigue haciendo Algolia.
 */
import { NextResponse } from "next/server";
import { corregirLocal, norm, terminosClave, type Correccion } from "@/lib/corrector";

const { AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_DEPLOYMENT } = process.env;
const AZURE_OPENAI_KEY = process.env.AZURE_OPENAI_API_KEY || process.env.AZURE_OPENAI_KEY;
async function corregirAzure(q: string): Promise<Correccion | null> {
  // API v1 de Azure OpenAI / Foundry: {recurso}/openai/v1/chat/completions, el despliegue va en "model"
  const base = AZURE_OPENAI_ENDPOINT!.replace(/\/openai\/v1.*$/, "").replace(/\/$/, "");
  const res = await fetch(`${base}/openai/v1/chat/completions`, {
    method: "POST",
    headers: { "api-key": AZURE_OPENAI_KEY!, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(8000),
    body: JSON.stringify({
      model: AZURE_OPENAI_DEPLOYMENT,
      // gpt-5-mini es un modelo de razonamiento: sin temperature; razonamiento mínimo para responder rápido
      reasoning_effort: "minimal",
      max_completion_tokens: 400,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Corriges errores de escritura en búsquedas de un directorio de comercios de Alajuela, Costa Rica. " +
            "Devuelve SOLO JSON {\"corregida\": \"...\"}. Corrige ortografía; no agregues palabras ni cambies la intención. " +
            "Si una palabra se parece a uno de estos términos válidos, usa el término válido: " +
            terminosClave().join(", "),
        },
        { role: "user", content: q },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Azure ${res.status}`);
  const data = await res.json();
  const corregida = norm(JSON.parse(data.choices[0].message.content).corregida ?? "").trim();
  if (!corregida || corregida === norm(q).trim()) return null;
  const a = norm(q).split(/\s+/), b = corregida.split(/\s+/);
  const cambios = a.map((de, i) => ({ de, a: b[i] ?? "" })).filter((c) => c.a && c.de !== c.a);
  return { original: q, corregida, cambios, motor: "azure" };
}

export async function POST(req: Request) {
  const { q } = (await req.json().catch(() => ({}))) as { q?: string };
  if (!q?.trim()) return NextResponse.json({ correccion: null });

  if (AZURE_OPENAI_ENDPOINT && AZURE_OPENAI_KEY && AZURE_OPENAI_DEPLOYMENT) {
    try {
      return NextResponse.json({ correccion: await corregirAzure(q) });
    } catch (err) {
      console.warn("[corregir] Azure no disponible, se usa el corrector local:", (err as Error).message);
    }
  }
  return NextResponse.json({ correccion: corregirLocal(q) });
}

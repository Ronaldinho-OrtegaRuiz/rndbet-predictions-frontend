import { cookies } from "next/headers";
import { RNDBET_ACCESS_COOKIE } from "./constants";

/**
 * Cabecera Authorization para fetch en Server Components (cookie espejo del token).
 */
export async function getServerAuthHeaders(): Promise<
  Record<string, string>
> {
  const jar = await cookies();
  const raw = jar.get(RNDBET_ACCESS_COOKIE)?.value;
  if (!raw) return {};
  try {
    const token = decodeURIComponent(raw);
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  } catch {
    return {};
  }
}

import type { ProblemDetails } from "./standings-types";

export async function parseProblemDetails(
  res: Response,
): Promise<ProblemDetails | undefined> {
  try {
    const data: unknown = await res.json();
    if (data && typeof data === "object") {
      const o = data as Record<string, unknown>;
      return {
        status: typeof o.status === "number" ? o.status : undefined,
        title: typeof o.title === "string" ? o.title : undefined,
        detail: typeof o.detail === "string" ? o.detail : undefined,
      };
    }
  } catch {
    /* ignore */
  }
  return undefined;
}

"use client";

import { requestLogin } from "@/lib/api/login";
import { persistClientSession } from "@/lib/auth/client-session";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const username = String(
      (form.elements.namedItem("username") as HTMLInputElement)?.value ?? "",
    ).trim();
    const password = String(
      (form.elements.namedItem("password") as HTMLInputElement)?.value ?? "",
    );
    if (!username || !password) return;

    setLoading(true);
    const result = await requestLogin(username, password);
    setLoading(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    persistClientSession(result.accessToken, result.expiresIn);
    const raw = searchParams.get("next");
    const target =
      raw &&
      raw.startsWith("/") &&
      !raw.startsWith("//") &&
      !raw.includes("://")
        ? raw
        : "/inicio";
    router.push(target);
    router.refresh();
  }

  return (
    <div className="w-full max-w-[400px] rounded-xl border border-neutral-200/70 bg-transparent px-8 py-10 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] hover:border-neutral-300/90 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <h1 className="text-center text-2xl font-semibold tracking-tight text-neutral-900">
        Iniciar sesión
      </h1>
      <p className="mt-2 text-center text-sm text-neutral-500">
        Accede a tu cuenta
      </p>

      <form className="mt-8 flex flex-col gap-5" onSubmit={onSubmit}>
        {error ? (
          <p
            className="rounded-lg border border-rose-200/90 bg-rose-50 px-3 py-2 text-center text-sm text-rose-800"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="username"
            className="text-sm font-medium text-neutral-700"
          >
            Usuario
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            disabled={loading}
            className="rounded-lg border border-neutral-200/80 bg-white px-3 py-2.5 text-neutral-900 outline-none transition-[box-shadow,border-color] placeholder:text-neutral-400 focus:border-neutral-400/90 focus:ring-2 focus:ring-neutral-300/25 disabled:opacity-60"
            placeholder="tu_usuario"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-neutral-700"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={loading}
            className="rounded-lg border border-neutral-200/80 bg-white px-3 py-2.5 text-neutral-900 outline-none transition-[box-shadow,border-color] placeholder:text-neutral-400 focus:border-neutral-400/90 focus:ring-2 focus:ring-neutral-300/25 disabled:opacity-60"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex w-full items-center justify-center rounded-lg border border-neutral-300/80 bg-neutral-900 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>

        <Link
          href="/inicio"
          className="text-center text-sm text-neutral-500 underline-offset-2 hover:text-neutral-700 hover:underline"
        >
          Volver al inicio
        </Link>
      </form>
    </div>
  );
}

import { Suspense } from "react";
import { FallingLogos } from "./FallingLogos";
import { LoginForm } from "./LoginForm";

function LoginFormFallback() {
  return (
    <div
      className="w-full max-w-[400px] rounded-xl border border-neutral-200/70 bg-white/80 px-8 py-10 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
      aria-hidden
    >
      <div className="mx-auto h-8 w-48 animate-pulse rounded-md bg-neutral-200/80" />
      <div className="mx-auto mt-3 h-4 w-32 animate-pulse rounded-md bg-neutral-200/60" />
      <div className="mt-8 space-y-5">
        <div className="h-16 animate-pulse rounded-lg bg-neutral-100" />
        <div className="h-16 animate-pulse rounded-lg bg-neutral-100" />
        <div className="h-11 animate-pulse rounded-lg bg-neutral-200/70" />
      </div>
    </div>
  );
}

/** Vista completa de login: fondo animado + formulario centrado. */
export function LoginScreen() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <FallingLogos />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

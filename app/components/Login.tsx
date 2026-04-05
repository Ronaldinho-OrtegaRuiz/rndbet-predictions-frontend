import { FallingLogos } from "./FallingLogos";

export function Login() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <FallingLogos />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-[400px] rounded-2xl border-2 border-blue-500 bg-transparent px-8 py-10 shadow-[0_8px_30px_rgba(37,99,235,0.12),0_2px_8px_rgba(0,0,0,0.06)]">
          <h1 className="text-center text-2xl font-semibold tracking-tight text-neutral-900">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-center text-sm text-neutral-500">
            Accede a tu cuenta
          </p>

          <form className="mt-8 flex flex-col gap-5" action="#" method="post">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-neutral-700"
              >
                Correo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-neutral-900 outline-none transition-[box-shadow,border-color] placeholder:text-neutral-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="tu@correo.com"
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
                className="rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-neutral-900 outline-none transition-[box-shadow,border-color] placeholder:text-neutral-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded-lg border-2 border-blue-600 bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 hover:border-blue-700"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

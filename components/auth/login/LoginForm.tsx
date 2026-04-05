import Link from "next/link";

export function LoginForm() {
  return (
    <div className="w-full max-w-[400px] rounded-xl border border-neutral-200/70 bg-transparent px-8 py-10 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] hover:border-neutral-300/90 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <h1 className="text-center text-2xl font-semibold tracking-tight text-neutral-900">
        Iniciar sesión
      </h1>
      <p className="mt-2 text-center text-sm text-neutral-500">
        Accede a tu cuenta
      </p>

      <form className="mt-8 flex flex-col gap-5" action="#" method="post">
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
            className="rounded-lg border border-neutral-200/80 bg-white px-3 py-2.5 text-neutral-900 outline-none transition-[box-shadow,border-color] placeholder:text-neutral-400 focus:border-neutral-400/90 focus:ring-2 focus:ring-neutral-300/25"
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
            className="rounded-lg border border-neutral-200/80 bg-white px-3 py-2.5 text-neutral-900 outline-none transition-[box-shadow,border-color] placeholder:text-neutral-400 focus:border-neutral-400/90 focus:ring-2 focus:ring-neutral-300/25"
            placeholder="••••••••"
          />
        </div>

        <Link
          href="/inicio"
          className="mt-2 flex w-full items-center justify-center rounded-lg border border-neutral-300/80 bg-neutral-100 py-2.5 text-center text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-400/90 hover:bg-neutral-200/80"
        >
          Entrar
        </Link>
      </form>
    </div>
  );
}

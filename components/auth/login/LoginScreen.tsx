import { FallingLogos } from "./FallingLogos";
import { LoginForm } from "./LoginForm";

/** Vista completa de login: fondo animado + formulario centrado. */
export function LoginScreen() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <FallingLogos />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
}

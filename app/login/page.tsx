import { LoginScreen } from "@/components/auth/login/LoginScreen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión | RND Predictions",
  description: "Accede con tu usuario",
};

export default function LoginPage() {
  return <LoginScreen />;
}

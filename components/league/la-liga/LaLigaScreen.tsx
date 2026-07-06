import { Suspense } from "react";
import { LaLigaView } from "./LaLigaView";

export function LaLigaScreen() {
  return (
    <Suspense fallback={null}>
      <LaLigaView />
    </Suspense>
  );
}

import { Suspense } from "react";
import { SerieAView } from "./SerieAView";

export function SerieAScreen() {
  return (
    <Suspense fallback={null}>
      <SerieAView />
    </Suspense>
  );
}

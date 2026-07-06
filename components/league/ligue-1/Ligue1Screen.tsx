import { Suspense } from "react";
import { Ligue1View } from "./Ligue1View";

export function Ligue1Screen() {
  return (
    <Suspense fallback={null}>
      <Ligue1View />
    </Suspense>
  );
}

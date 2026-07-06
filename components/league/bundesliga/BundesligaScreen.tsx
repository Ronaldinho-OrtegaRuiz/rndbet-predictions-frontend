import { Suspense } from "react";
import { BundesligaView } from "./BundesligaView";

export function BundesligaScreen() {
  return (
    <Suspense fallback={null}>
      <BundesligaView />
    </Suspense>
  );
}

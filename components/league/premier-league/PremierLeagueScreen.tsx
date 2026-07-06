import { Suspense } from "react";
import { PremierLeagueView } from "./PremierLeagueView";

export function PremierLeagueScreen() {
  return (
    <Suspense fallback={null}>
      <PremierLeagueView />
    </Suspense>
  );
}

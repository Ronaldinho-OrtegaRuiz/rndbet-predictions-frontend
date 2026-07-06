import { Suspense } from "react";
import { ChampionsLeagueView } from "./ChampionsLeagueView";

export function ChampionsLeagueScreen() {
  return (
    <Suspense fallback={null}>
      <ChampionsLeagueView />
    </Suspense>
  );
}

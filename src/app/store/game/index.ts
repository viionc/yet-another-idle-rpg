import { createSelector } from "@ngrx/store";
import { gameFeature } from "./game.reducer";

export const selectPlayerAttackSpeed = createSelector(gameFeature.selectGameState, (state) => state.attackSpeed)
import { createAction, props } from "@ngrx/store";
import { PlayerStat } from "../../../types/player/playerStat.type";

export const updatePlayerStatAction = createAction('[Player] Update Stat', props<{ stat: PlayerStat, amount: number }>())

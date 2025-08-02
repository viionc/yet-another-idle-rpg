import { createAction, props } from "@ngrx/store"
import { PlayerStat } from "../../../types/player/playerStat.type"

export const updatePlayerStatsAction = createAction('[Player] Update Stats', props<{ stats: { stat: PlayerStat, amount: number }[] }>())

import { createAction, props } from "@ngrx/store"
import { PlayerStat } from "../../../types/player/playerStat.type"
import { InventoryItem } from 'interfaces/item.interface'

export const updatePlayerStatsAction = createAction('[Player] Update Stats', props<{ stats: { stat: PlayerStat, amount: number }[] }>())
export const updatePlayerInventoryAction = createAction('[Player] Update Inventory', props<{ items: InventoryItem[] }>())
export const updatePlayerResourcesAction = createAction('[Player] Update Resources', props<{ resources: InventoryItem[] }>())

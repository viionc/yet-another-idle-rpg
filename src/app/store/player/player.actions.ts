import { createAction, props } from "@ngrx/store"
import { PlayerStat } from "../../../types/player/playerStat.type"
import { InventoryItem } from 'interfaces/item.interface'
import { EquipmentSlot } from 'enums/equipment-slot.enum'
import { ItemID } from 'enums/ids/item-id.enum'
import { ItemTier } from 'enums/items/item-tier.enum'

export const updatePlayerStatsAction = createAction('[Player] Update Stats', props<{ stats: { stat: PlayerStat, amount: number }[] }>())
export const updatePlayerInventoryAction = createAction('[Player] Update Inventory', props<{ items: InventoryItem[] }>())
export const updatePlayerResourcesAction = createAction('[Player] Update Resources', props<{ resources: InventoryItem[] }>())

export const equipItemAction = createAction('[Player] Equip Item', props<{ item: InventoryItem }>())
export const unequipItemAction = createAction('[Player] Unequip Item', props<{ slot: EquipmentSlot }>())
export const equipItemToSlotAction = createAction('[Player] Equip Item To Slot', props<{ id: ItemID, slot: EquipmentSlot, tier: ItemTier }>())

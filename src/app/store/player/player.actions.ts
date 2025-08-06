import { createAction, props } from "@ngrx/store"
import { PlayerStat } from "../../../types/player/playerStat.type"
import { InventoryItem } from 'interfaces/item.interface'
import { EquipmentSlotKey } from 'enums/equipment-slot.enum'
import { ItemID } from 'enums/ids/item-id.enum'
import { ItemTier } from 'enums/items/item-tier.enum'

// stats
export const updatePlayerStatsAction = createAction('[Player] Update Stats', props<{ stats: { stat: PlayerStat, amount: number }[] }>())

// inventory
export const updatePlayerInventoryAction = createAction('[Player] Update Inventory', props<{ items: InventoryItem[] }>())
export const removeItemFromInventoryAction = createAction('[Player] Remove Item From Inventory', props<{ id: ItemID, tier: ItemTier }>())

// resources
export const updatePlayerResourcesAction = createAction('[Player] Update Resources', props<{ resources: InventoryItem[] }>())

// equipment
export const equipItemAction = createAction('[Player] Equip Item', props<{ item: InventoryItem }>())
export const unequipItemAction = createAction('[Player] Unequip Item', props<{ slot: EquipmentSlotKey }>())
export const ununequipItemFromSlotAction = createAction('[Player] Unequip Item From Slot', props<{ slot: EquipmentSlotKey }>())
export const equipItemToSlotAction = createAction('[Player] Equip Item To Slot', props<{ id: ItemID, slot: EquipmentSlotKey, tier: ItemTier }>())

import { EquipmentSlot } from 'enums/equipment-slot.enum'
import { ItemID } from 'enums/ids/item-id.enum'
import { ItemTier } from 'enums/items/item-tier.enum'
import { ItemType } from 'enums/items/item-type.enum'
import { UsableItemType } from 'enums/usable-item-type.enum'
import { PlayerStat } from 'types/player/playerStat.type'

export interface ItemData {
    id: ItemID
    tier: ItemTier
    value: number
    url: string
    type: ItemType
    description?: string
}

export interface EquipmentItemPossibleStat {
    id: PlayerStat
    amount: number
}

export interface EquipmentItem extends ItemData {
    type: ItemType.equipment
    stats: EquipmentItemPossibleStat[]
    slot: EquipmentSlot
}

export interface ResourceItem extends ItemData {
    type: ItemType.resource
}

export interface RewardsStatsItem extends ItemData {
    type: ItemType.rewardsStats
    stats: {
        id: PlayerStat
        amount: number
    }[]
}

export interface QuestItem extends ItemData {
    type: ItemType.quest
}

export interface FoodItem extends ItemData {
    type: ItemType.food
}

export interface BookItem extends ItemData {
    type: ItemType.book
}

export interface PotionItem extends ItemData {
    type: ItemType.potion
}

export type Item = EquipmentItem | ResourceItem | RewardsStatsItem | QuestItem | FoodItem | BookItem | PotionItem

export type UseItemProps = UseItemStatProps

export type UseItemStatProps = {
    type: UsableItemType
    id: PlayerStat
    amount: 1
}

export type InventoryItem = {
    id: ItemID
    type: ItemType
    tier: ItemTier
    amount: number
}

import { ItemID } from 'enums/ids/item-id.enum'

export type EnemyDrop = {
    id: ItemID
    minAmount: number
    maxAmount: number
    chance: number
}

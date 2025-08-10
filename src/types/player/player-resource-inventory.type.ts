import { ItemID } from '../../enums/ids/item-id.enum'
import { ResourceInventoryItem } from '../../interfaces/item.interface'

export type PlayerResourceInventoryType = Partial<Record<ItemID, ResourceInventoryItem>>

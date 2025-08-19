import { QuestID } from '../../enums/ids/quest-id.enum'
import { PlayerStat } from '../player/player-stat.type'

export type DialogueEffect =
    | QuestEffect
    | StatEffect
    | ShopEffect

interface QuestEffect {
    type: 'quest'
    questId: QuestID
    action: 'start' | 'advance' | 'end'
}

interface StatEffect {
    type: 'stat'
    stats: { key: PlayerStat, amount: number }[]
}

interface ShopEffect {
    type: 'shop'
    shopId: number
}

import { QuestID } from '../../enums/ids/quest-id.enum'
import { PlayerStat } from '../player/player-stat.type'

export type DialogueCondition =
    | QuestCompletedCondition
    | QuestStepCondition
    | StatCondition

interface QuestCompletedCondition {
    type: 'questCompleted'
    questId: QuestID
}

interface QuestStepCondition {
    type: 'questStep'
    questId: QuestID
    step: number
}

interface StatCondition {
    type: 'stat'
    key: PlayerStat
    comparison: 'gte' | 'lte'
    value: number
}

import { UnlockRequirementType } from '../enums/unlock-requirement-type.enum'
import { QuestID } from '../enums/ids/quest-id.enum'

export type UnlockRequirement = QuestUnlockRequirement;

export interface QuestUnlockRequirement {
    type: UnlockRequirementType.quest
    questId: QuestID
    step: number
}

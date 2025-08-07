import { SkillPointID } from 'enums/ids/skill-tree-node-id.enum'
import { SpellID } from 'enums/ids/spell-id.enum'
import { SkillPointType } from 'enums/skill-point-type.enum'
import { PlayerStat } from 'types/player/playerStat.type'

export interface SkillPoint {
    id: SkillPointID
    skillPointCost: number
    maxLevel: number
    unlockRequirements: null
    url: string
    type: SkillPointType
    stat?: PlayerStat
    statAmount?: number
    special?: boolean
    spellId?: SpellID
}
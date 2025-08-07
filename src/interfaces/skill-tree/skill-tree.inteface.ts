import { SkillTreeID } from 'enums/ids/skill-tree-id.enum'
import { SkillPointID } from 'enums/ids/skill-tree-node-id.enum'

export interface SkillTree {
    id: SkillTreeID
    skills: SkillPointID[][]
    unlockRequirement: null
}
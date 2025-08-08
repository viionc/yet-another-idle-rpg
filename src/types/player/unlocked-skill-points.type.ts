import { SkillPointID } from '../../enums/ids/skill-tree-node-id.enum';

type UnlockedAmount = number

export type UnlockedSkillPoints = Partial<Record<SkillPointID, UnlockedAmount>>

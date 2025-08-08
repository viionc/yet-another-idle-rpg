import { SpellID } from '../../enums/ids/spell-id.enum';

type SpellLevel = number

export type UnlockedSpellsType = Partial<Record<SpellID, SpellLevel>>

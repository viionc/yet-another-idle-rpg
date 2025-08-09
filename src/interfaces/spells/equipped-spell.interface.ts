import { SpellID } from '../../enums/ids/spell-id.enum';
import { SpellType } from '../../enums/spell-type.enum';

export interface EquippedSpell {
    spellId: SpellID
    spellType: SpellType
    cooldown: number
    duration?: number
}

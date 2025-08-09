import { createAction, props } from '@ngrx/store'
import { EnemyID } from 'enums/ids/enemy-id.enum'
import { ZoneID } from 'enums/ids/zone-id.enum'
import { SpellID } from '../../../enums/ids/spell-id.enum';
import { SpellType } from '../../../enums/spell-type.enum';
import { EquippedSpell } from '../../../interfaces/spells/equipped-spell.interface';

export const startBattleAction = createAction('[Battle] Start')
export const changeZoneAction = createAction('[Battle] Change Zone', props<{ zoneId: ZoneID }>())
export const defaultAttackAction = createAction('[Battle] Default Attack', props<{ isDoubleAttack?: boolean }>())
export const updateEnemyHpAction = createAction('[Battle] Update Enemy Hp', props<{ newHp: number }>())
export const battleEndedAction = createAction('[Battle] Ended', props<{
    enemyId: EnemyID,
    zoneId: ZoneID,
    currentWave: number
}>())
export const nextWaveAction = createAction('[Battle] Next Wave')
export const previousWaveAction = createAction('[Battle] Previous Wave')
export const enabledAutoWaveProgressionAction = createAction('[Battle] Enabled Auto Wave Progression', props<{
    enabled: boolean
}>())
export const castSpellAction = createAction('[Battle] Cast Spell', props<{ spellId: SpellID }>())
export const equipSpellAction = createAction('[Battle] Equip Spell', props<{ spellId: SpellID }>())
export const updateEquippedSpellAction = createAction('[Battle] Update Equipped Spell', props<{
    spellId: SpellID,
    cooldown: number,
    duration?: number
}>())
export const updateEquippedSpellsAction = createAction('[Battle] Update Equipped Spells', props<{
    equippedSpells: EquippedSpell[]
}>())
export const addSpellToSpellBarAction = createAction('[Battle] Add Spell To Spell Bar', props<{
    spellId: SpellID,
    cooldown: number,
    spellType: SpellType,
    duration?: number
}>())

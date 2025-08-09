import { createSelector } from '@ngrx/store'
import { playerFeature } from './player.reducer'
import { PlayerStat } from '../../../types/player/player-stat.type'
import { ZoneID } from 'enums/ids/zone-id.enum'
import { SkillPointID } from '../../../enums/ids/skill-tree-node-id.enum';
import { SpellID } from '../../../enums/ids/spell-id.enum';
import SPELLS_DATA from '../../../data/spells-data';
import { SpellType } from '../../../enums/spell-type.enum';

export const selectPlayerStats = createSelector(playerFeature.selectPlayerState, (state) => state.stats)
export const selectPlayerStat = (stat: PlayerStat) => createSelector(playerFeature.selectPlayerState, (state) => state.stats[stat])
export const selectZoneProgressionByZoneIdAndWave = (zoneId: ZoneID, wave: number) => createSelector(playerFeature.selectPlayerState, (state) => (state.zonesProgression[zoneId] || {})[wave] || 0)
export const selectPlayerInventory = createSelector(playerFeature.selectPlayerState, (state) => state.inventory)
export const selectPlayerEquipment = createSelector(playerFeature.selectPlayerState, (state) => state.equipment)
export const selectUnlockedSkillPoints = createSelector(playerFeature.selectPlayerState, (state) => state.unlockedSkillPoints)
export const selectHasAutoWaveProgressionUnlocked = createSelector(playerFeature.selectPlayerState, (state) => !!state.unlockedSkillPoints[SkillPointID.autoWaveProgression])
export const selectPlayerUnlockedSpells = createSelector(playerFeature.selectPlayerState, (state) => state.unlockedSpells)

export const selectSpellDurationAndCooldown = (spellId: SpellID) => createSelector(
    playerFeature.selectPlayerState,
    (state) => {
        const spell = SPELLS_DATA[spellId]

        return {
            cooldown: spell.baseCooldown - state.stats.spellCooldownReduction,
            duration: spell.effect.type === SpellType.buff ? spell.effect.duration - state.stats.increasedSpellDuration : 0,
        }
    },
)

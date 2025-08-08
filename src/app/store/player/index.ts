import { createSelector } from '@ngrx/store'
import { playerFeature } from './player.reducer'
import { PlayerStat } from '../../../types/player/player-stat.type'
import { ZoneID } from 'enums/ids/zone-id.enum'

export const selectPlayerStats = createSelector(playerFeature.selectPlayerState, (state) => state.stats)
export const selectPlayerStat = (stat: PlayerStat) => createSelector(playerFeature.selectPlayerState, (state) => state.stats[stat])
export const selectZoneProgressionByZoneIdAndWave = (zoneId: ZoneID, wave: number) => createSelector(playerFeature.selectPlayerState, (state) => (state.zonesProgression[zoneId] || {})[wave] || 0)
export const selectPlayerInventory = createSelector(playerFeature.selectPlayerState, (state) => state.inventory)
export const selectPlayerEquipment = createSelector(playerFeature.selectPlayerState, (state) => state.equipment)
export const selectUnlockedSkillPoints = createSelector(playerFeature.selectPlayerState, (state) => state.unlockedSkillPoints)

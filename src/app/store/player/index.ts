import { createSelector } from '@ngrx/store'
import { playerFeature } from './player.reducer'
import { PlayerStat } from '../../../types/player/player-stat.type'
import { ZoneID } from 'enums/ids/zone-id.enum'

export const selectPlayerStats = createSelector(playerFeature.selectPlayerState, (state) => state.stats)
// export const selectPlayerUnspentSkillPoints = createSelector(playerFeature.selectPlayerState, (state) => state.stats.unspentSkillPoints)
export const selectPlayerLevel = createSelector(playerFeature.selectPlayerState, (state) => state.stats.level)
export const selectPlayerStatsAsArray = createSelector(playerFeature.selectPlayerState, (state) => Object.entries(state.stats) as [PlayerStat, number][])
export const selectPlayerStat = (stat: PlayerStat) => createSelector(playerFeature.selectPlayerState, (state) => state.stats[stat])
export const selectZoneProgressionByZoneIdAndWave = (zoneId: ZoneID, wave: number) => createSelector(playerFeature.selectPlayerState, (state) => (state.zonesProgression[zoneId] || {})[wave] || 0)
export const selectPlayerInventory = createSelector(playerFeature.selectPlayerState, (state) => state.inventory)
export const selectPlayerEquipment = createSelector(playerFeature.selectPlayerState, (state) => state.equipment)

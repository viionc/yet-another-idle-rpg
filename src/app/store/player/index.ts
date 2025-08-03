import { createSelector } from '@ngrx/store'
import { playerFeature } from './player.reducer'
import { PlayerStat } from '../../../types/player/playerStat.type'
import { ZoneID } from 'enums/ids/zone-id.enum'

export const selectPlayerStats = createSelector(playerFeature.selectPlayerState, (state) => state.stats)
export const selectPlayerStatsAsArray = createSelector(playerFeature.selectPlayerState, (state) => Object.entries(state.stats) as [PlayerStat, number][])
export const selectPlayerStat = (stat: PlayerStat) => createSelector(playerFeature.selectPlayerState, (state) => state.stats[stat])
export const selectZoneProgressionByZoneIdAndWave = (zoneId: ZoneID, wave: number) => createSelector(playerFeature.selectPlayerState, (state) => (state.zonesProgression[zoneId] || {})[wave] || 0)
import { createSelector } from '@ngrx/store'
import { battleFeature } from './battle.reducer'
import ZONES_DATA from 'data/zones-data'
import { playerFeature } from '../player/player.reducer';

export const selectIsInCombat = createSelector(battleFeature.selectBattleState, (state) => state.isInCombat)
export const selectCurrentEnemyHp = createSelector(battleFeature.selectBattleState, (state) => state.currentEnemyHp)
export const selectCurrentEnemy = createSelector(battleFeature.selectBattleState, (state) => state.enemy)
export const selectCurrentZoneId = createSelector(battleFeature.selectBattleState, (state) => state.currentZone)
export const selectCurrentZoneData = createSelector(battleFeature.selectBattleState, (state) => ZONES_DATA[state.currentZone])
export const selectCurrentWave = createSelector(battleFeature.selectBattleState, (state) => state.currentWave)
export const selectHasAutoWaveProgressionEnabled = createSelector(battleFeature.selectBattleState, (state) => state.autoWaveProgressionEnabled)

export const selectCurrentWaveKillCount = createSelector(
    battleFeature.selectBattleState,
    playerFeature.selectZonesProgression,
    (battleState, zoneProgression) => (zoneProgression[battleState.currentZone] || {})[battleState.currentWave] || 0,
)

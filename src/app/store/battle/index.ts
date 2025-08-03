import { createSelector } from '@ngrx/store'
import { battleFeature } from './battle.reducer'
import ZONES_DATA from 'data/zones-data'

export const selectIsInCombat = createSelector(battleFeature.selectBattleState, (state) => state.isInCombat)
export const selectCurrentEnemyHp = createSelector(battleFeature.selectBattleState, (state) => state.currentEnemyHp)
export const selectCurrentEnemy = createSelector(battleFeature.selectBattleState, (state) => state.enemy)
export const selectCurrentZoneId = createSelector(battleFeature.selectBattleState, (state) => state.currentZone)
export const selectCurrentZoneData = createSelector(battleFeature.selectBattleState, (state) => ZONES_DATA[state.currentZone])

import { createSelector } from '@ngrx/store';
import { battleFeature } from './battle.reducer';

export const selectIsInCombat = createSelector(battleFeature.selectBattleState, (state) => state.isInCombat)
export const selectCurrentEnemyHp = createSelector(battleFeature.selectBattleState, (state) => state.currentEnemyHp)
export const selectCurrentEnemy = createSelector(battleFeature.selectBattleState, (state) => state.enemy)

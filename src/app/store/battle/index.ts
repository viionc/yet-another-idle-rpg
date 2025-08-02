import { createSelector } from '@ngrx/store';
import { battleFeature } from './battle.reducer';

export const selectIsInCombat = createSelector(battleFeature.selectBattleState, (state) => state.isInCombat)

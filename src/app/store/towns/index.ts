import { createSelector } from '@ngrx/store'
import { townsFeature } from './towns.reducer'

export const selectSelectedTownId = createSelector(townsFeature.selectTownsState, (state) => state.selectedTownId)
export const selectSelectedTownBuildingId = createSelector(townsFeature.selectTownsState, (state) => state.selectedTownBuilding)

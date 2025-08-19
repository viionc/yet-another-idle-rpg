// store/towns/towns.reducer.ts
import { createFeature, createReducer, on } from '@ngrx/store'
import { TownID } from '../../../enums/map/town-id.enum'
import { selectTownAction, selectTownBuildingAction } from './towns.actions'
import { TownBuilding } from '../../../data/towns-data'

export interface TownsState {
    selectedTownId: TownID | null
    selectedTownBuilding: TownBuilding | null
}

export const initialState: TownsState = {
    selectedTownId: null,
    selectedTownBuilding: null,
}

export const reducer = createReducer(
    initialState,
    on(selectTownAction, (state, { townId }) => ({
        ...state,
        selectedTownId: townId,
    })),
    on(selectTownBuildingAction, (state, { townBuilding }) => ({
        ...state,
        selectedTownBuilding: townBuilding,
    })),
)

export const townsFeature = createFeature({
    name: 'towns',
    reducer,

})

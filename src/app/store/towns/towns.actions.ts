import { createAction, props } from '@ngrx/store'
import { TownID } from '../../../enums/map/town-id.enum'
import { TownBuilding } from '../../../data/towns-data'

export const selectTownAction = createAction('[Towns] Select Town', props<{ townId: TownID }>())
export const selectTownBuildingAction = createAction('[Towns] Select Town Building', props<{
    townBuilding: TownBuilding
}>())

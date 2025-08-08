import { createFeature, createReducer, on } from '@ngrx/store'
import { resetStateAction } from '../actions'
import { GameTab } from 'enums/ids/game-tab.enum'

export interface GameState {
    gameTab: GameTab
}

export const initialState: GameState = {
    gameTab: GameTab.main,
}

const reducer = createReducer(
    initialState,
    on(resetStateAction, () => initialState),
)

export const gameFeature = createFeature({
    name: 'game',
    reducer,
})

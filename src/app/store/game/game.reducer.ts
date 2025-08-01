// counter.reducer.ts
import { createReducer, on, createFeature } from '@ngrx/store';
// import { increment, decrement, reset } from './counter.actions';
// import { initialState } from './counter.state';
import * as actions from './game.actions'

export interface GameState {
    tick: number
    attackSpeed: number
}

const initialState: GameState = {
    tick: 0,
    attackSpeed: 3,
}

const reducer = createReducer(
  initialState,
  on(actions.updateTickAction, (state) => ({
    ...state,
    tick: state.tick + 1
  }))
);

export const gameFeature = createFeature({
  name: 'game',
  reducer,
});
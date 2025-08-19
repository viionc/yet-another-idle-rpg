import { initialState as battleInitialState } from './battle/battle.reducer'
import { initialState as gameInitialState } from './game/game.reducer'
import { initialState as playerInitialState } from './player/player.reducer'
import { initialState as townsInitialState } from './towns/towns.reducer'

export const initialStates = {
    player: playerInitialState,
    game: gameInitialState,
    battle: battleInitialState,
    towns: townsInitialState,
}

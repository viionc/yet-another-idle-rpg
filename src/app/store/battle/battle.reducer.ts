import { createReducer, on, createFeature } from '@ngrx/store'
import { Enemy } from 'interfaces/enemy.inteface'
import * as actions from './battle.actions'
import { ZoneID } from 'enums/ids/zone-id.enum'
import ZONES_DATA from 'data/zones-data'
import ENEMIES_DATA from 'data/enemies-data'


export interface BattleState {
    isInCombat: boolean
    enemy: Enemy | null
    currentEnemyHp: number,
    currentZone: ZoneID
}

const initialState: BattleState = {
    isInCombat: false,
    enemy: null,
    currentEnemyHp: 0,
    currentZone: ZoneID.horseshoeBeach,
}

const startBattle = (state: BattleState): BattleState => {
    console.log('battleStarted')
    const possibleEnemies = ZONES_DATA[state.currentZone].enemies
    const randomIndex = Math.floor(Math.random() * possibleEnemies.length)
    const enemyId = possibleEnemies[randomIndex]
    const enemy = ENEMIES_DATA[enemyId]


    return {
        ...state,
        isInCombat: true,
        enemy,
        currentEnemyHp: enemy.maxHp,
    }
}

const reducer = createReducer(
    initialState,
    on(actions.startBattleAction, (state) => startBattle(state)),
    on(actions.changeZoneAction, (state, { zoneId }) => ({
        ...state,
        currentZone: zoneId,
    })),
    on(actions.updateEnemyHpAction, (state, { newHp }) => ({
        ...state,
        currentEnemyHp: newHp,
    })),
    on(actions.battleEndedAction, (state) => ({
        ...state,
        currentEnemyHp: 0,
        enemy: null,
        isInCombat: false,
    }))
)

export const battleFeature = createFeature({
    name: 'battle',
    reducer,
})
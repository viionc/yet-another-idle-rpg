import { createReducer, on, createFeature } from '@ngrx/store'
import { Enemy } from 'interfaces/enemy.inteface'
import * as actions from './battle.actions'
import { ZoneID } from 'enums/ids/zone-id.enum'
import ZONES_DATA from 'data/zones-data'
import ENEMIES_DATA from 'data/enemies-data'
import { resetStateAction } from '../actions'


export interface BattleState {
    isInCombat: boolean
    enemy: Enemy | null
    currentEnemyHp: number,
    currentZone: ZoneID
    currentWave: number
}

export const initialState: BattleState = {
    isInCombat: false,
    enemy: null,
    currentEnemyHp: 0,
    currentZone: ZoneID.horseshoeBeach,
    currentWave: 1,
}

const startBattle = (state: BattleState): BattleState => {
    console.log('battleStarted')
    const zoneData = ZONES_DATA[state.currentZone]
    let enemy = null

    if (state.currentWave !== zoneData.maxWave) {
        const possibleEnemies = ZONES_DATA[state.currentZone].enemies
        const randomIndex = Math.floor(Math.random() * possibleEnemies.length)
        const enemyId = possibleEnemies[randomIndex]
        enemy = ENEMIES_DATA[enemyId]
    } else {
        enemy = ENEMIES_DATA[zoneData.bossEnemyId]
    }


    return {
        ...state,
        isInCombat: true,
        enemy,
        currentEnemyHp: enemy.maxHp,
    }
}

const handleWave = (state: BattleState, next: boolean): BattleState => {
    const zoneData = ZONES_DATA[state.currentZone]

    if (next) {
        const nextZone = zoneData.nextZoneId
        const shouldGoNextZone = nextZone && state.currentWave === zoneData.maxWave
        const wave = shouldGoNextZone ? 1 : state.currentWave + 1

        return {
            ...state,
            currentEnemyHp: 0,
            enemy: null,
            isInCombat: false,
            currentWave: wave,
            currentZone: shouldGoNextZone ? nextZone : state.currentZone
        }
    }

    const previousZoneId = zoneData.previousZoneId
    const previousZoneData = ZONES_DATA[previousZoneId]
    const shouldGoPreviousZone = previousZoneId && state.currentWave === 1
    const wave = shouldGoPreviousZone ? previousZoneData.maxWave : state.currentWave - 1

    return {
        ...state,
        currentEnemyHp: 0,
        enemy: null,
        isInCombat: false,
        currentWave: wave,
        currentZone: shouldGoPreviousZone ? previousZoneId : state.currentZone
    }
}

const reducer = createReducer(
    initialState,
    on(resetStateAction, () => initialState),
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
    })),
    on(actions.nextWaveAction, (state) => handleWave(state, true)),
    on(actions.previousWaveAction, (state) => handleWave(state, false))
)

export const battleFeature = createFeature({
    name: 'battle',
    reducer,
})
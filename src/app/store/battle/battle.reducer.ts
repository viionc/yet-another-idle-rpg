import { createFeature, createReducer, on } from '@ngrx/store'
import { Enemy } from 'interfaces/enemy.interface'
import * as actions from './battle.actions'
import { ZoneID } from 'enums/ids/zone-id.enum'
import ZONES_DATA from 'data/zones-data'
import ENEMIES_DATA from 'data/enemies-data'
import { resetStateAction } from '../actions'
import { EquippedSpell } from '../../../interfaces/spells/equipped-spell.interface';

export interface BattleState {
    isInCombat: boolean
    enemy: Enemy | null
    currentEnemyHp: number,
    currentZone: ZoneID
    currentWave: number
    autoWaveProgressionEnabled: boolean
    equippedSpells: EquippedSpell[]
}

export const initialState: BattleState = {
    isInCombat: false,
    enemy: null,
    currentEnemyHp: 0,
    currentZone: ZoneID.horseshoeBeach,
    currentWave: 1,
    autoWaveProgressionEnabled: false,
    equippedSpells: [],
}

const startBattle = (state: BattleState): BattleState => {
    console.log('battleStarted')
    const zoneData = ZONES_DATA[state.currentZone]
    let enemy: Enemy

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
        const isMaxWave = state.currentWave === zoneData.maxWave
        const shouldGoNextZone = nextZone && isMaxWave
        const wave = shouldGoNextZone
            ? 1
            : isMaxWave
                ? zoneData.maxWave
                : state.currentWave + 1

        return {
            ...state,
            currentEnemyHp: 0,
            enemy: null,
            isInCombat: false,
            currentWave: wave,
            currentZone: shouldGoNextZone ? nextZone : state.currentZone,
        }
    }

    const previousZoneId = zoneData.previousZoneId
    const previousZoneData = ZONES_DATA[previousZoneId]
    const isFirstWave = state.currentWave === 1
    const shouldGoPreviousZone = previousZoneId && isFirstWave
    const wave = shouldGoPreviousZone
        ? previousZoneData.maxWave
        : isFirstWave
            ? state.currentWave
            : state.currentWave - 1

    return {
        ...state,
        currentEnemyHp: 0,
        enemy: null,
        isInCombat: false,
        currentWave: wave,
        currentZone: shouldGoPreviousZone ? previousZoneId : state.currentZone,
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
    on(actions.previousWaveAction, (state) => handleWave(state, false)),
    on(actions.enabledAutoWaveProgressionAction, (state, { enabled }) => ({
        ...state,
        autoWaveProgressionEnabled: enabled,
    })),
    on(actions.addSpellToSpellBarAction, (state, spell) => ({
        ...state,
        equippedSpells: [...state.equippedSpells, spell],
    })),
    on(actions.updateEquippedSpellAction, (state, { spellId, cooldown, duration }) => {
        const spells = [...state.equippedSpells]
        const spellIndex = state.equippedSpells.findIndex((s) => s.spellId === spellId)
        spells[spellIndex] = {
            ...state.equippedSpells[spellIndex],
            cooldown,
            duration,
        }

        return {
            ...state,
            equippedSpells: spells,
        }
    }),
    on(actions.updateEquippedSpellsAction, (state, { equippedSpells }) => ({
        ...state,
        equippedSpells,
    })),
)

export const battleFeature = createFeature({
    name: 'battle',
    reducer,
})

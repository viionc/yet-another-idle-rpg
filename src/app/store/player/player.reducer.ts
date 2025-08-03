import { createReducer, on, State, Action, createFeature } from "@ngrx/store"
import { PlayerStat } from "../../../types/player/playerStat.type"
import * as actions from './player.actions'
import { calculatXp } from 'app/pipe/calculate-xp.pipe'
import { statsInitialState } from './player'
import { ZoneID } from 'enums/ids/zone-id.enum'
import { battleEndedAction } from '../battle/battle.actions'

export type PlayerStatsType = Record<PlayerStat, number>

interface PlayerState {
    stats: PlayerStatsType
    zonesProgression: Partial<Record<ZoneID, Record<number, number>>>
}

export const initialState: PlayerState = {
    stats: statsInitialState,
    zonesProgression: {}
}

const reducer = createReducer(
    initialState,
    on(actions.updatePlayerStatsAction, (state, { stats }) => updateStat(state, stats)),
    on(battleEndedAction, (state, { zoneId, currentWave }) => ({
        ...state,
        zonesProgression: {
            ...state.zonesProgression,
            [zoneId]: {
                ...state.zonesProgression[zoneId],
                [currentWave]: ((state.zonesProgression[zoneId] || {})[currentWave] || 0) + 1,
            }
        }
    }))
)

export const playerFeature = createFeature({
    name: 'player',
    reducer,
})

const handleExperience = (stats: PlayerStatsType) => {
    const xpForNextLevel = calculatXp(stats.level + 1)

    if (stats.experience < xpForNextLevel) return

    stats.level++
    stats.unspentSkillPoints++
    const leftoverXp = stats.experience - xpForNextLevel
    stats.experience = leftoverXp > 0 ? leftoverXp : 0
    handleExperience(stats)
}

const updateStat = (state: PlayerState, stats: { stat: PlayerStat, amount: number }[]) => {
    const tempStats = { ...state.stats }

    stats.forEach((stat) => {
        switch (stat.stat) {
            case 'attackSpeed':
            case 'manaRegenRate':
            case 'shopRefreshCooldown':
                tempStats[stat.stat] -= stat.amount
                break
            case 'experience': {
                tempStats[stat.stat] += stat.amount
                handleExperience(tempStats)
                break
            }
            default:
                tempStats[stat.stat] += stat.amount
        }
    })


    return {
        ...state,
        stats: tempStats,
    }
}

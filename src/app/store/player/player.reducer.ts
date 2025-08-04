import { createReducer, on, State, Action, createFeature } from "@ngrx/store"
import { PlayerStat } from "../../../types/player/playerStat.type"
import * as actions from './player.actions'
import { calculatXp } from 'app/pipe/calculate-xp.pipe'
import { initialEquipmentState, statsInitialState } from './player'
import { ZoneID } from 'enums/ids/zone-id.enum'
import { battleEndedAction } from '../battle/battle.actions'
import { EquipmentItem, InventoryItem, ResourceItem } from 'interfaces/item.interface'
import { ItemID } from 'enums/ids/item-id.enum'
import { EquipmentSlot } from 'enums/equipment-slot.enum'
import { ItemTier } from 'enums/items/item-tier.enum'
import ITEM_DATA from 'data/items-data'

export type PlayerStatsType = Record<PlayerStat, number>

interface PlayerState {
    stats: PlayerStatsType
    zonesProgression: Partial<Record<ZoneID, Record<number, number>>>
    resources: InventoryItem[]
    inventory: InventoryItem[]
    equipment: Record<keyof typeof EquipmentSlot, { id: ItemID, tier: ItemTier } | null>
}

export const initialState: PlayerState = {
    stats: statsInitialState,
    zonesProgression: {},
    resources: [],
    inventory: [],
    equipment: initialEquipmentState,
}

const itemIndexFromInventory = (inventory: InventoryItem[] | ResourceItem[], id: ItemID): number => inventory.findIndex(item => item.id === id)

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
    })),
    on(actions.updatePlayerInventoryAction, (state, { items }) => {
        const inventory = [...state.inventory]

        items.forEach((item) => {
            const itemIndex = itemIndexFromInventory(inventory, item.id)

            if (itemIndex === -1) {
                inventory.push(item)
                return
            }

            const inventoryItem = inventory[itemIndex]

            inventory[itemIndex] = {
                ...item,
                amount: inventoryItem.amount + item.amount
            }
        })

        return {
            ...state,
            inventory,
        }
    }),
    on(actions.updatePlayerResourcesAction, (state, { resources }) => {
        const resourcesState = [...state.resources]

        resources.forEach((item) => {
            const itemIndex = itemIndexFromInventory(resourcesState, item.id)

            if (itemIndex === -1) {
                resourcesState.push(item)
                return
            }

            const resourcesItem = resourcesState[itemIndex]

            resourcesState[itemIndex] = {
                ...item,
                amount: resourcesItem.amount + item.amount
            }
        })

        return {
            ...state,
            resources: resourcesState,
        }
    }),
    on(actions.equipItemToSlotAction, (state, { id, slot, tier }) => ({
        ...state,
        equipment: {
            ...state.equipment,
            [slot]: {
                id,
                tier,
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

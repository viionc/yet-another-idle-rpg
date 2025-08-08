import { createFeature, createReducer, on } from "@ngrx/store"
import { PlayerStat } from "../../../types/player/player-stat.type"
import * as actions from './player.actions'
import { calculateXp } from 'app/pipe/calculate-xp.pipe'
import { initialEquipmentState, statsInitialState } from './player'
import { battleEndedAction } from '../battle/battle.actions'
import { InventoryItem, ResourceItem } from 'interfaces/item.interface'
import { ItemID } from 'enums/ids/item-id.enum'
import { ItemTier } from 'enums/items/item-tier.enum'
import { resetStateAction } from '../actions'
import { EquipmentType } from 'interfaces/player/equipment.type'
import { ZonesProgression } from '../../../types/player/zones-progression.type';
import { UnlockedSkillPoints } from '../../../types/player/unlocked-skill-points.type';
import { UnlockedSpellsType } from '../../../types/player/unlocked-spells.type';

export type PlayerStatsType = Record<PlayerStat, number>

interface PlayerState {
    stats: PlayerStatsType
    zonesProgression: ZonesProgression
    resources: InventoryItem[]
    inventory: (InventoryItem | null)[]
    equipment: EquipmentType
    unlockedSkillPoints: UnlockedSkillPoints
    unlockedSpells: UnlockedSpellsType
}

export const initialState: PlayerState = {
    stats: statsInitialState,
    zonesProgression: {},
    resources: [],
    inventory: new Array(40).fill(null),
    equipment: initialEquipmentState,
    unlockedSkillPoints: {},
    unlockedSpells: {},
}

const itemIndexFromInventory = (inventory: (InventoryItem | null)[] | ResourceItem[], id: ItemID, tier: ItemTier): number => inventory.findIndex(item => item?.id === id && item?.tier === tier)

const reducer = createReducer(
    initialState,
    on(resetStateAction, () => initialState),
    on(actions.updatePlayerStatsAction, (state, { stats }) => updateStat(state, stats)),
    on(battleEndedAction, (state, { zoneId, currentWave }) => ({
        ...state,
        zonesProgression: {
            ...state.zonesProgression,
            [zoneId]: {
                ...state.zonesProgression[zoneId],
                [currentWave]: ((state.zonesProgression[zoneId] || {})[currentWave] || 0) + 1,
            },
        },
    })),
    on(actions.updatePlayerInventoryAction, (state, { items }) => {
        const inventory = [...state.inventory]

        items.forEach((item) => {
            const itemIndex = itemIndexFromInventory(inventory, item.id, item.tier)
            const emptySlotIndex = inventory.findIndex(i => i === null)

            if (itemIndex !== -1 && emptySlotIndex === -1) return

            if (itemIndex === -1) {
                inventory[emptySlotIndex] = item
                return
            }

            const inventoryItem = inventory[itemIndex]

            inventory[itemIndex] = {
                ...item,
                amount: inventoryItem.amount + item.amount,
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
            const itemIndex = itemIndexFromInventory(resourcesState, item.id, item.tier)

            if (itemIndex === -1) {
                resourcesState.push(item)
                return
            }

            const resourcesItem = resourcesState[itemIndex]

            resourcesState[itemIndex] = {
                ...item,
                amount: resourcesItem.amount + item.amount,
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
            },
        },
    })),
    on(actions.unequipItemFromSlotAction, (state, { slot }) => ({
        ...state,
        equipment: {
            ...state.equipment,
            [slot]: null,
        },
    })),
    on(actions.removeItemFromInventoryAction, (state, { id, tier }) => {
        const itemIndex = itemIndexFromInventory(state.inventory, id, tier)

        const newInventory = [...state.inventory]
        const item = newInventory[itemIndex]

        if (item.amount - 1 === 0) {
            newInventory[itemIndex] = null
        } else {
            newInventory[itemIndex] = {
                ...item,
                amount: item.amount - 1,
            }
        }

        return {
            ...state,
            inventory: newInventory,
        }
    }),
    on(actions.updateUnlockedSkillPointsAction, (state, { id, amount }) => ({
        ...state,
        unlockedSkillPoints: {
            ...state.unlockedSkillPoints,
            [id]: (state.unlockedSkillPoints[id] || 0) + amount,
        },
    })),
    on(actions.levelUpSpellAction, (state, { id }) => ({
        ...state,
        unlockedSpells: {
            ...state.unlockedSpells,
            [id]: (state.unlockedSpells[id] || 0) + 1,
        },
    })),
)

export const playerFeature = createFeature({
    name: 'player',
    reducer,
})

const handleExperience = (stats: PlayerStatsType) => {
    const xpForNextLevel = calculateXp(stats.level + 1)

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

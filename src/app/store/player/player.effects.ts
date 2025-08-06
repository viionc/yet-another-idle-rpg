import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { switchMap, withLatestFrom } from 'rxjs'
import { selectPlayerEquipment, selectPlayerStats } from '../player'
import { Action, Store } from '@ngrx/store'
import { battleEndedAction } from '../battle/battle.actions'
import ENEMIES_DATA from 'data/enemies-data'
import { PlayerStat } from 'types/player/playerStat.type'
import { equipItemAction, equipItemToSlotAction, removeItemFromInventoryAction, unequipItemAction, ununequipItemFromSlotAction, updatePlayerInventoryAction, updatePlayerResourcesAction, updatePlayerStatsAction } from './player.actions'
import { EquipmentItem, InventoryItem } from 'interfaces/item.interface'
import ITEM_DATA from 'data/items-data'
import { Enemy } from 'interfaces/enemy.inteface'
import { ItemType } from 'enums/items/item-type.enum'
import { EquipmentSlot, EquipmentSlotKey } from 'enums/equipment-slot.enum'

@Injectable()
export class PlayerEffects {
    updateStats$ = createEffect(() =>
        this.actions$.pipe(
            ofType(battleEndedAction),
            withLatestFrom(
                this.store.select(selectPlayerStats),
            ),
            switchMap(([{ enemyId }, playerStats]) => {
                const enemy = ENEMIES_DATA[enemyId]
                const xpGained = enemy.experience * playerStats.xpMultiplier
                const goldGained = 1

                const statsToUpdate: { stat: PlayerStat, amount: number }[] = [
                    { stat: 'experience', amount: xpGained },
                    { stat: 'goldCoins', amount: goldGained },
                ]

                const { itemsToUpdate, resourcesToUpdate } = this.calculateEnemyDrops(enemy)

                const actions: any[] = [
                    updatePlayerStatsAction({ stats: statsToUpdate })
                ]

                if (itemsToUpdate.length) actions.push(updatePlayerInventoryAction({ items: itemsToUpdate }))
                if (resourcesToUpdate.length) actions.push(updatePlayerResourcesAction({ resources: resourcesToUpdate }))


                return actions
            })
        )
    )

    equipItem$ = createEffect(() => this.actions$.pipe(
        ofType(equipItemAction),
        withLatestFrom(this.store.select(selectPlayerEquipment)),
        switchMap(([{ item }, equipment]) => {
            const itemData = ITEM_DATA[item.id] as EquipmentItem

            const statsToUpdate: { stat: PlayerStat, amount: number }[] = []
            const itemStats = itemData.stats || []
            const itemToEquipSlot = EquipmentSlot[itemData.slot] as EquipmentSlotKey

            itemStats.forEach(i => {
                statsToUpdate.push({
                    stat: i.id,
                    amount: i.amount,
                })
            })

            const actions: Action[] = [
                updatePlayerStatsAction({ stats: statsToUpdate }),
                equipItemToSlotAction({ id: item.id, slot: itemToEquipSlot, tier: item.tier }),
                removeItemFromInventoryAction({ id: item.id, tier: item.tier }),
            ]

            let equippedItem = equipment[EquipmentSlot[itemData.slot]]

            if (!equippedItem) return actions

            const type = ITEM_DATA[equippedItem.id].type

            equippedItem = {
                ...equippedItem,
                amount: 1,
                type,
            }

            const equippedItemStats = ITEM_DATA[equippedItem?.id]?.stats || []
            equippedItemStats.forEach(i => {
                statsToUpdate.push({
                    stat: i.id,
                    amount: -1 * i.amount,
                })
            })


            return [
                ...actions,
                updatePlayerInventoryAction({ items: [equippedItem] })
            ]
        })
    ))

    unequipItem$ = createEffect(() => this.actions$.pipe(
        ofType(unequipItemAction),
        withLatestFrom(this.store.select(selectPlayerEquipment)),
        switchMap(([{ slot }, equipment]) => {
            const equippedItem = equipment[slot]
            const itemData = ITEM_DATA[equippedItem.id]

            const item = {
                ...equippedItem,
                amount: 1,
                type: itemData.type,
            } as any

            const statsToUpdate: { stat: PlayerStat, amount: number }[] = []
            const equippedItemStats = ITEM_DATA[item?.id]?.stats || []
            equippedItemStats.forEach(i => {
                statsToUpdate.push({
                    stat: i.id,
                    amount: -1 * i.amount,
                })
            })

            return [
                updatePlayerInventoryAction({ items: [item] }),
                ununequipItemFromSlotAction({ slot }),
                updatePlayerStatsAction({ stats: statsToUpdate }),
            ]
        })
    ))

    constructor(
        private actions$: Actions,
        private store: Store,
    ) { }

    calculateEnemyDrops(enemy: Enemy): {
        itemsToUpdate: InventoryItem[]
        resourcesToUpdate: InventoryItem[]
    } {
        const itemsToUpdate: InventoryItem[] = []
        const resourcesToUpdate: InventoryItem[] = []

        for (const drop of enemy.drops) {
            const roll = Math.ceil(Math.random() * drop.chance)

            if (roll !== drop.chance) continue

            const amount = Math.floor(Math.random() * (drop.maxAmount - drop.minAmount + 1) + drop.minAmount)

            const { type, tier } = ITEM_DATA[drop.id]

            switch (type) {
                case ItemType.equipment:
                case ItemType.book:
                case ItemType.food:
                case ItemType.potion:
                case ItemType.quest:
                case ItemType.rewardsStats:
                    itemsToUpdate.push({ id: drop.id, type, tier, amount })
                    break
                case ItemType.resource:
                    resourcesToUpdate.push({ id: drop.id, type, tier, amount })
                    break
                default:
                // do nothing

            }

        }

        return {
            itemsToUpdate,
            resourcesToUpdate,
        }
    }
}
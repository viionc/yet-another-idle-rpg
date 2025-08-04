import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { switchMap, withLatestFrom } from 'rxjs'
import { selectPlayerStats } from '../player'
import { Store } from '@ngrx/store'
import { battleEndedAction } from '../battle/battle.actions'
import ENEMIES_DATA from 'data/enemies-data'
import { PlayerStat } from 'types/player/playerStat.type'
import { updatePlayerInventoryAction, updatePlayerResourcesAction, updatePlayerStatsAction } from './player.actions'
import { InventoryItem, ResourceItem } from 'interfaces/item.interface'
import ITEM_DATA from 'data/items-data'
import { Enemy } from 'interfaces/enemy.inteface'
import { ItemType } from 'enums/items/item-type.enum'

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

                console.log(itemsToUpdate)
                console.log(resourcesToUpdate)



                const actions: any[] = [
                    updatePlayerStatsAction({ stats: statsToUpdate })
                ]

                if (itemsToUpdate.length) actions.push(updatePlayerInventoryAction({ items: itemsToUpdate }))
                if (resourcesToUpdate.length) actions.push(updatePlayerResourcesAction({ resources: resourcesToUpdate }))

                console.log(actions)


                return actions
            })
        )
    );

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
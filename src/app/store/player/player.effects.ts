import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { switchMap, withLatestFrom } from 'rxjs'
import { selectPlayerStats } from '../player'
import { Store } from '@ngrx/store'
import { battleEndedAction } from '../battle/battle.actions'
import ENEMIES_DATA from 'data/enemies-data'
import { PlayerStat } from 'types/player/playerStat.type'
import { updatePlayerStatsAction } from './player.actions'

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

                return [updatePlayerStatsAction({ stats: statsToUpdate })]
            })
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
    ) { }
}
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { switchMap, withLatestFrom } from 'rxjs'
import { battleEndedAction, defaultAttackAction, updateEnemyHpAction } from './battle.actions'
import { selectPlayerStats } from '../player'
import { Store } from '@ngrx/store'
import { selectCurrentEnemy, selectCurrentEnemyHp } from '.'

@Injectable()
export class BattleEffects {
    defaultAttack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(defaultAttackAction),
            withLatestFrom(
                this.store.select(selectPlayerStats),
                this.store.select(selectCurrentEnemy),
                this.store.select(selectCurrentEnemyHp),
            ),
            switchMap(([_, playerStats, currentEnemy, currentEnemyHp]) => {
                const hpAfterDamage = currentEnemyHp - playerStats.attackPower
                const isDead = hpAfterDamage <= 0

                const actions: any[] = [updateEnemyHpAction({ newHp: hpAfterDamage <= 0 ? 0 : hpAfterDamage })]

                if (isDead) actions.push(battleEndedAction({ enemyId: currentEnemy.id }))

                return actions
            })
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
    ) { }
}
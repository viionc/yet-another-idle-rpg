import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { switchMap, withLatestFrom } from 'rxjs'
import { battleEndedAction, defaultAttackAction, nextWaveAction, updateEnemyHpAction } from './battle.actions'
import { selectPlayerStats } from '../player'
import { Store } from '@ngrx/store'
import {
    selectCurrentEnemy,
    selectCurrentEnemyHp,
    selectCurrentWave,
    selectCurrentWaveKillCount,
    selectCurrentZoneId,
    selectHasAutoWaveProgressionEnabled,
} from '.'
import ZONES_DATA from '../../../data/zones-data';

@Injectable()
export class BattleEffects {
    defaultAttack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(defaultAttackAction),
            withLatestFrom(
                this.store.select(selectCurrentZoneId),
                this.store.select(selectCurrentWave),
                this.store.select(selectHasAutoWaveProgressionEnabled),
                this.store.select(selectPlayerStats),
                this.store.select(selectCurrentEnemy),
                this.store.select(selectCurrentEnemyHp),
                this.store.select(selectCurrentWaveKillCount),
            ),
            switchMap(([_, currentZoneId, currentWave, hasAutoWaveProgressionEnabled, playerStats, currentEnemy, currentEnemyHp, killCount]) => {
                const hpAfterDamage = currentEnemyHp - playerStats.attackPower
                const isDead = hpAfterDamage <= 0

                const actions: any[] = [updateEnemyHpAction({ newHp: hpAfterDamage <= 0 ? 0 : hpAfterDamage })]

                if (!isDead) return actions

                actions.push(battleEndedAction({
                    enemyId: currentEnemy.id,
                    zoneId: currentZoneId,
                    currentWave,
                }))

                const { enemiesPerWave, maxWave } = ZONES_DATA[currentZoneId]
                const isLastWave = currentWave === maxWave
                let shouldProgressToNextWave = hasAutoWaveProgressionEnabled && (((killCount + 1) >= enemiesPerWave) || isLastWave)

                if (shouldProgressToNextWave) actions.push(nextWaveAction())

                return actions
            }),
        ),
    );

    constructor(
        private actions$: Actions,
        private store: Store,
    ) {
    }
}

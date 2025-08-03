import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { combineLatest, combineLatestWith, Subject, Subscription, tap } from 'rxjs'
import { selectPlayerAttackSpeed } from '../store/game'
import { clearInterval, setInterval } from 'worker-timers'
import { selectCurrentEnemy, selectCurrentWave, selectIsInCombat } from 'app/store/battle'
import { defaultAttackAction, startBattleAction } from 'app/store/battle/battle.actions'

const TICK_DURATION_IN_MS = 100

@Injectable({ providedIn: 'root' })
export class GameIntervalService {
    private intervalSub!: Subscription
    private interval!: number
    private keepAlive = new Subject<void>()
    private attackSpeed$ = this.store.select(selectPlayerAttackSpeed)
    private isInCombat$ = this.store.select(selectIsInCombat)
    private resetBattleTickSub$: Subscription
    private battleTick = 0
    private tick = 0

    constructor(private store: Store) { }

    initInterval() {
        if (this.intervalSub) return

        // start interval using worker-timers so the interval keeps going when user switches to a different tab in browser
        this.interval = setInterval(() => { this.keepAlive.next() }, TICK_DURATION_IN_MS)
        this.intervalSub = this.keepAlive.pipe(
            combineLatestWith(
                this.attackSpeed$,
                this.isInCombat$,
            ),
            tap(() => {
                this.tick += 1
                this.battleTick += 1
            }),
        ).subscribe(([_, attackSpeed, isInCombat]) => {
            if (((attackSpeed * 1000) / (this.battleTick * TICK_DURATION_IN_MS) === 1)) {
                this.battleTick = 0

                if (!isInCombat) {
                    this.store.dispatch(startBattleAction())
                } else {
                    this.store.dispatch(defaultAttackAction())
                }
            }

            if (this.tick / 1000 === 1) {
                this.tick = 0
            }
        })

        this.resetBattleTickSub$ = combineLatest([
            this.store.select(selectCurrentWave),
            this.store.select(selectCurrentEnemy)
        ]).subscribe(() => this.battleTick = 0)

    }

    stopInterval() {
        clearInterval(this.interval)
        this.keepAlive.next()
        this.keepAlive.complete()
        this.intervalSub?.unsubscribe()
    }
}
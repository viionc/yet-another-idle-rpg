import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { combineLatest, Subject, Subscription, tap, withLatestFrom } from 'rxjs'
import { clearInterval, setInterval } from 'worker-timers'
import { selectCurrentEnemy, selectCurrentWave, selectIsInCombat } from 'app/store/battle'
import { doDamageAction, startBattleAction } from 'app/store/battle/battle.actions'
import { selectPlayerStat } from 'app/store/player'
import { updateTickAction } from '../store/actions'

const TICK_DURATION_IN_MS = 100
const TICK_DURATION_IN_SECONDS = 1000

@Injectable({ providedIn: 'root' })
export class GameIntervalService {
    private intervalSub!: Subscription
    private interval!: number
    private keepAlive = new Subject<void>()
    private attackSpeed$ = this.store.select(selectPlayerStat('attackSpeed'))
    private isInCombat$ = this.store.select(selectIsInCombat)
    private resetBattleTickSub: Subscription
    private battleTick = 0
    private tick = 0

    constructor(private store: Store) {
    }

    initInterval() {
        if (this.intervalSub) return

        // start interval using worker-timers so the interval keeps going when user switches to a different tab in browser
        this.interval = setInterval(() => {
            this.keepAlive.next()
        }, TICK_DURATION_IN_MS)
        this.intervalSub = this.keepAlive.pipe(
            withLatestFrom(
                this.isInCombat$,
                this.attackSpeed$,
            ),
            tap(() => {
                this.tick += 1
                this.battleTick += 1
            }),
        ).subscribe(([_, isInCombat, attackSpeed]) => {
            if (((attackSpeed * 1000) / (this.battleTick * TICK_DURATION_IN_MS) <= 1)) {
                console.log(this.battleTick * TICK_DURATION_IN_MS)
                this.battleTick = 0

                if (!isInCombat) {
                    this.store.dispatch(startBattleAction())
                } else {
                    this.store.dispatch(doDamageAction({}))
                }
            }

            if (this.tick * 100 >= TICK_DURATION_IN_SECONDS) {
                this.tick = 0
                this.store.dispatch(updateTickAction())
            }
        })

        this.resetBattleTickSub = combineLatest([
            this.store.select(selectCurrentWave),
            this.store.select(selectCurrentEnemy),
        ]).subscribe(() => this.battleTick = 0)

    }

    stopInterval() {
        clearInterval(this.interval)
        this.keepAlive.next()
        this.keepAlive.complete()
        this.intervalSub?.unsubscribe()
        this.resetBattleTickSub?.unsubscribe()
    }
}

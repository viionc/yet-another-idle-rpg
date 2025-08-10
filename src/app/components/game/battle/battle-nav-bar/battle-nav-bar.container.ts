import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { BattleNavBarComponent } from "./battle-nav-bar.component"
import { Enemy } from 'interfaces/enemy.interface'
import { Zone } from 'interfaces/zone.interface'
import { selectCurrentWave, selectCurrentWaveKillCount, selectHasAutoWaveProgressionEnabled } from 'app/store/battle'
import { selectHasAutoWaveProgressionUnlocked } from 'app/store/player'
import { AsyncPipe } from '@angular/common'
import { enabledAutoWaveProgressionAction, nextWaveAction, previousWaveAction } from 'app/store/battle/battle.actions'

@Component({
    selector: 'app-battle-nav-bar-container',
    template: `
        <app-battle-nav-bar
            [currentEnemy]="currentEnemy"
            [currentZone]="currentZone"
            [currentWave]="currentWave$ | async"
            [currentWaveKillCount]="currentWaveKillCount$ | async"
            [hasAutoWaveProgressionUnlocked]="hasAutoWaveProgressionUnlocked$ | async"
            [hasAutoWaveProgressionEnabled]="hasAutoWaveProgressionEnabled$ | async"
            (onNextWave)="onNextWave()"
            (onPreviousWave)="onPreviousWave()"
            (enableAutoWaveProgressionAction)="enableAutoWaveProgressionAction($event)"
        />`,
    imports: [BattleNavBarComponent, AsyncPipe],
})

export class BattleNavBarContainer {
    @Input() currentEnemy: Enemy
    @Input() currentZone: Zone

    hasAutoWaveProgressionUnlocked$ = this.store.select(selectHasAutoWaveProgressionUnlocked)
    hasAutoWaveProgressionEnabled$ = this.store.select(selectHasAutoWaveProgressionEnabled)
    currentWave$ = this.store.select(selectCurrentWave)
    currentWaveKillCount$ = this.store.select(selectCurrentWaveKillCount)

    constructor(private store: Store) {
    }

    onNextWave() {
        this.store.dispatch(nextWaveAction())
    }

    onPreviousWave() {
        this.store.dispatch(previousWaveAction())
    }

    enableAutoWaveProgressionAction(enabled: boolean) {
        this.store.dispatch(enabledAutoWaveProgressionAction({ enabled }))
    }
}

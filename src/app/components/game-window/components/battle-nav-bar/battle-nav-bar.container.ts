import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { BattleNavBarComponent } from "./battle-nav-bar.component"
import { Enemy } from 'interfaces/enemy.inteface'
import { Zone } from 'interfaces/zone.interface'
import { selectCurrentWave } from 'app/store/battle'
import { of, switchMap } from 'rxjs'
import { selectZoneProgressionByZoneIdAndWave } from 'app/store/player'
import { AsyncPipe } from '@angular/common'
import { nextWaveAction, previousWaveAction } from 'app/store/battle/battle.actions'

@Component({
    selector: 'app-battle-nav-bar-container',
    template: `<app-battle-nav-bar 
        [currentEnemy]="currentEnemy"
        [currentZone]="currentZone"
        [killCount]="killCount$ | async"
        [currentWave]="currentWave$ | async"
        (onNextWave)="onNextWave()"
        (onPreviousWave)="onPreviousWave()"
    />`,
    imports: [BattleNavBarComponent, AsyncPipe]
})

export class BattleNavBarContainer {
    @Input() currentEnemy: Enemy
    @Input() currentZone: Zone

    currentWave$ = this.store.select(selectCurrentWave)
    killCount$ = this.currentWave$.pipe(
        switchMap((wave) => {
            if (!this.currentZone) return of(0)

            return this.store.select(selectZoneProgressionByZoneIdAndWave(this.currentZone.id, wave))
        })
    )

    constructor(private store: Store) { }

    onNextWave() {
        console.log('test')

        this.store.dispatch(nextWaveAction())
    }

    onPreviousWave() {
        this.store.dispatch(previousWaveAction())
    }
}
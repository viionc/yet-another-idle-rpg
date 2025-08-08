import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectCurrentEnemyHp } from 'app/store/battle'
import { Enemy } from 'interfaces/enemy.interface'
import { EnemyWindowContainerComponent } from "./enemy-window.component"
import { AsyncPipe } from '@angular/common'

@Component({
    selector: 'app-enemy-window-container',
    template: `
        <app-enemy-window
            [currentEnemy]="currentEnemy"
            [currentEnemyHp]="currentEnemyHp$ | async"
        />
    `,
    imports: [EnemyWindowContainerComponent, AsyncPipe]
})

export class EnemyWindowContainer {
    @Input() currentEnemy: Enemy

    currentEnemyHp$ = this.store.select(selectCurrentEnemyHp)

    constructor(private store: Store) {
    }
}

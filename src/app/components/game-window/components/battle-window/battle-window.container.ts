import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { BattleWindowComponent } from "./battle-window.component"
import { selectCurrentEnemy, selectCurrentZoneData, selectIsInCombat } from 'app/store/battle'
import { AsyncPipe } from '@angular/common'

@Component({
    selector: 'app-battle-window-container',
    template: `
        <app-battle-window
            [currentZone]="currentZone$ | async"
            [isInCombat]="isInCombat$ | async"
            [currentEnemy]="currentEnemy$ | async"
        />
    `,
    imports: [BattleWindowComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BattleWindowContainer {
    currentZone$ = this.store.select(selectCurrentZoneData)
    isInCombat$ = this.store.select(selectIsInCombat)
    currentEnemy$ = this.store.select(selectCurrentEnemy)

    constructor(private store: Store) {
    }
}

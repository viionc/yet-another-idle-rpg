import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { BattleComponent } from "./battle.component"
import { selectCurrentEnemy, selectCurrentZoneData, selectIsInCombat } from 'app/store/battle'
import { AsyncPipe } from '@angular/common'

@Component({
    selector: 'app-battle-container',
    template: `
        <app-battle
            [currentZone]="currentZone$ | async"
            [isInCombat]="isInCombat$ | async"
            [currentEnemy]="currentEnemy$ | async"
        />
    `,
    imports: [BattleComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BattleContainer {
    currentZone$ = this.store.select(selectCurrentZoneData)
    isInCombat$ = this.store.select(selectIsInCombat)
    currentEnemy$ = this.store.select(selectCurrentEnemy)

    constructor(private store: Store) {
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SpellsComponent } from './spells.component'
import { Store } from '@ngrx/store'
import { AsyncPipe } from '@angular/common'
import { PanelComponent } from '../../shared/panel/panel.component'
import { selectEquippedSpells, selectIsInCombat } from '../../../store/battle'
import { selectPlayerStats } from '../../../store/player'
import { SpellID } from '../../../../enums/ids/spell-id.enum'
import { castSpellAction } from '../../../store/battle/battle.actions'

@Component({
    selector: 'app-spells-container',
    template: `
        <app-panel>
            <app-spells
                [equippedSpells]="equippedSpells$ | async"
                [playerStats]="playerStats$ | async"
                [isInCombat]="isInCombat$ | async"
                (castSpell)="castSpell($event)"
            />
        </app-panel>
    `,
    imports: [SpellsComponent, PanelComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsContainer {
    equippedSpells$ = this.store.select(selectEquippedSpells)
    playerStats$ = this.store.select(selectPlayerStats)
    isInCombat$ = this.store.select(selectIsInCombat)

    constructor(private store: Store) {
    }

    castSpell(spellId: SpellID) {
        this.store.dispatch(castSpellAction({ spellId }))
    }
}

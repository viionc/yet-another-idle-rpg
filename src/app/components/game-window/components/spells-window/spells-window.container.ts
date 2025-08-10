import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SpellsWindowComponent } from './spells-window.component'
import { PanelComponent } from '../../../shared/panel/panel.component'
import { Store } from '@ngrx/store'
import { AsyncPipe } from '@angular/common'
import { SpellID } from '../../../../../enums/ids/spell-id.enum'
import { castSpellAction } from '../../../../store/battle/battle.actions'
import { selectEquippedSpells, selectIsInCombat } from '../../../../store/battle'
import { selectPlayerStats } from '../../../../store/player'

@Component({
    selector: 'app-spells-window-container',
    template: `
        <app-panel>
            <app-spells-window
                [equippedSpells]="equippedSpells$ | async"
                [playerStats]="playerStats$ | async"
                [isInCombat]="isInCombat$ | async"
                (castSpell)="castSpell($event)"
            />
        </app-panel>
    `,
    imports: [SpellsWindowComponent, PanelComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsWindowContainer {
    equippedSpells$ = this.store.select(selectEquippedSpells)
    playerStats$ = this.store.select(selectPlayerStats)
    isInCombat$ = this.store.select(selectIsInCombat)

    constructor(private store: Store) {
    }

    castSpell(spellId: SpellID) {
        this.store.dispatch(castSpellAction({ spellId }))
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpellsWindowComponent } from './spells-window.component';
import { PanelComponent } from '../../../shared/panel/panel.component';
import { Store } from '@ngrx/store';
import { selectPlayerUnlockedSpells } from '../../../../store/player';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-spells-window-container',
    template: `
        <app-panel>
            <app-spells-window
                [unlockedSpells]="unlockedSpells$ | async"
            />
        </app-panel>
    `,
    imports: [SpellsWindowComponent, PanelComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsWindowContainer {
    unlockedSpells$ = this.store.select(selectPlayerUnlockedSpells)

    constructor(private store: Store) {
    }
}

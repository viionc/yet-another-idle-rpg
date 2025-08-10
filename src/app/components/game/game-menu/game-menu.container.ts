import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { GameMenuComponent } from "./game-menu.component"
import { selectPlayerStat } from 'app/store/player'
import { Store } from '@ngrx/store'
import { AsyncPipe } from '@angular/common'
import { GameTab } from 'enums/ids/game-tab.enum'

@Component({
    selector: 'app-game-menu-container',
    template: `
        <app-game-menu
            [skillPoints]="skillPoints$ | async"
            [level]="level$ | async"
            (changeTab)="changeTab.emit($event)"
        />
    `,
    imports: [GameMenuComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameMenuContainer {
    skillPoints$ = this.store.select(selectPlayerStat('unspentSkillPoints'))
    level$ = this.store.select(selectPlayerStat('level'))

    @Output() changeTab = new EventEmitter<GameTab>()

    constructor(private store: Store) {
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core'
import { GameMenuComponent } from "./game-menu.component"
import { selectPlayerStat } from 'app/store/player'
import { Store } from '@ngrx/store'
import { AsyncPipe } from '@angular/common'
import { tap } from 'rxjs'

@Component({
    selector: 'app-game-menu-container',
    template: `
        <app-game-menu 
            [skillPoints]="skillPoints$ | async"
            [level]="level$ | async"
        />
    `,
    imports: [GameMenuComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameMenuContainer {
    skillPoints$ = this.store.select(selectPlayerStat('unspentSkillPoints'))
    level$ = this.store.select(selectPlayerStat('level'))

    constructor(private store: Store) { }
}
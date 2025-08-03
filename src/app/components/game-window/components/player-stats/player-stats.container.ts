import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { NameComponent } from "./player-stats.component"
import { Store } from '@ngrx/store'
import { AsyncPipe } from '@angular/common'
import { selectPlayerStats } from 'app/store/player'

@Component({
    selector: 'app-player-stats-container',
    template: `<app-player-stats
        [playerStats]="playerStats$ | async"
    />`,
    imports: [NameComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PlayerStatsComponent implements OnInit {
    playerStats$ = this.store.select(selectPlayerStats)

    constructor(private store: Store) { }

    ngOnInit() { }
}
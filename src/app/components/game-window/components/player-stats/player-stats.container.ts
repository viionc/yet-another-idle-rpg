import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AsyncPipe } from '@angular/common'
import { selectPlayerStats } from 'app/store/player'
import { PlayerStatsComponent } from "./player-stats.component"

@Component({
    selector: 'app-player-stats-container',
    template: `<app-player-stats
        [playerStats]="playerStats$ | async"
    />`,
    imports: [AsyncPipe, PlayerStatsComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PlayerStatsContainer implements OnInit {
    playerStats$ = this.store.select(selectPlayerStats)

    constructor(private store: Store) { }

    ngOnInit() { }
}
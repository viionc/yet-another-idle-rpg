import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AsyncPipe } from '@angular/common'
import { selectPlayerStats } from 'app/store/player'
import { PlayerStatsComponent } from "./player-stats.component"
import { PanelComponent } from "app/components/shared/panel/panel.component"

@Component({
    selector: 'app-player-stats-container',
    template: `
    <app-panel>
        <app-player-stats
            [playerStats]="playerStats$ | async"
        />
    </app-panel>`,
    imports: [AsyncPipe, PlayerStatsComponent, PanelComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PlayerStatsContainer implements OnInit {
    playerStats$ = this.store.select(selectPlayerStats)

    constructor(private store: Store) { }

    ngOnInit() { }
}
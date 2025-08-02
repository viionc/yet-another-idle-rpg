import { Component, OnInit } from '@angular/core';
import { NameComponent } from "./player-stats.component";
import { Store } from '@ngrx/store';
import { selectPlayerStats, selectPlayerStatsAsArray } from '../../../store/player';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-player-stats-container',
    template: `<app-player-stats
        [playerStats]="playerStats$ | async"
    />`,
    imports: [NameComponent, AsyncPipe]
})

export class PlayerStatsComponent implements OnInit {
    playerStats$ = this.store.select(selectPlayerStats)

    constructor(private store: Store) { }

    ngOnInit() { }
}
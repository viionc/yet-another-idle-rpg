import { Component, Input, OnInit } from '@angular/core';
import { PlayerStat } from '../../../../types/player/playerStat.type';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../pipe/i18next.pipe';
import { PlayerStatsType } from '../../../store/player/player.reducer';
import { CalculateXpPipe } from '../../../pipe/calculate-xp.pipe';
import { AbbreviatePipe } from '../../../pipe/abbreviate.pipe';

@Component({
    selector: 'app-player-stats',
    templateUrl: 'player-stats.component.html',
    imports: [CommonModule, TranslatePipe, CalculateXpPipe, AbbreviatePipe],
    styleUrls: ['./player-stats.component.sass']
})

export class NameComponent implements OnInit {
    @Input() playerStats: PlayerStatsType

    Math = Math

    constructor() { }

    ngOnInit() { }
}
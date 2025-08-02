import { Component, OnInit } from '@angular/core';
import { PanelComponent } from '../shared/panel/panel.component';
import { PlayerStatsComponent } from "./components/player-stats.container";

@Component({
    selector: 'app-game-window',
    templateUrl: 'game-window.component.html',
    styleUrls: ['./game-window.component.sass'],
    imports: [PanelComponent, PlayerStatsComponent]
})

export class GameWindowComponent {

}
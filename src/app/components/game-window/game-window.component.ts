import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { PanelComponent } from '../shared/panel/panel.component'
import { PlayerStatsComponent } from './components/player-stats/player-stats.container'
import { BattleWindowContainer } from "./components/battle-window/battle-window.container"

@Component({
    selector: 'app-game-window',
    templateUrl: 'game-window.component.html',
    styleUrls: ['./game-window.component.sass'],
    imports: [PanelComponent, PlayerStatsComponent, BattleWindowContainer],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameWindowComponent {

}
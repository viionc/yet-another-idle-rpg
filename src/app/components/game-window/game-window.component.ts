import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { PanelComponent } from '../shared/panel/panel.component'
import { PlayerStatsComponent } from './components/player-stats/player-stats.container'
import { BattleWindowContainer } from "./components/battle-window/battle-window.container"
import { GameMenuComponent } from "./components/game-menu/game-menu.component"
import { GameMenuContainer } from "./components/game-menu/game-menu.container"
import { InventoryWindowContainer } from "./components/inventory-window/inventory-window.container"

@Component({
    selector: 'app-game-window',
    templateUrl: 'game-window.component.html',
    styleUrls: ['./game-window.component.sass'],
    imports: [PanelComponent, PlayerStatsComponent, BattleWindowContainer, GameMenuContainer, InventoryWindowContainer],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameWindowComponent {

}
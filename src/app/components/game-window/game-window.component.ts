import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { PanelComponent } from '../shared/panel/panel.component'
import { BattleWindowContainer } from "./components/battle-window/battle-window.container"
import { GameMenuContainer } from "./components/game-menu/game-menu.container"
import { InventoryWindowContainer } from "./components/inventory-window/inventory-window.container"
import { Store } from '@ngrx/store'
import { resetStateAction } from 'app/store/actions'
import { EquipmentWindowContainer } from "./components/equipment-window/equipment-window.container"
import { PlayerStatsContainer } from "./components/player-stats/player-stats.container"

@Component({
    selector: 'app-game-window',
    templateUrl: 'game-window.component.html',
    styleUrls: ['./game-window.component.sass'],
    imports: [PanelComponent, BattleWindowContainer, GameMenuContainer, InventoryWindowContainer, EquipmentWindowContainer, PlayerStatsContainer],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameWindowComponent {
    constructor(private store: Store) { }

    resetState() {
        this.store.dispatch(resetStateAction())
    }
}
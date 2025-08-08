import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PanelComponent } from '../shared/panel/panel.component'
import { BattleWindowContainer } from "./components/battle-window/battle-window.container"
import { GameMenuContainer } from "./components/game-menu/game-menu.container"
import { InventoryWindowContainer } from "./components/inventory-window/inventory-window.container"
import { Store } from '@ngrx/store'
import { resetStateAction } from 'app/store/actions'
import { EquipmentWindowContainer } from "./components/equipment-window/equipment-window.container"
import { PlayerStatsContainer } from "./components/player-stats/player-stats.container"
import { BehaviorSubject } from 'rxjs'
import { GameTab } from 'enums/ids/game-tab.enum'
import { AsyncPipe, CommonModule } from '@angular/common'
import { SkillTreeWindowContainer } from "./skill-tree-tab/skill-tree-window.container"
import { updatePlayerStatsAction } from '../../store/player/player.actions';
import { PlayerStat } from '../../../types/player/player-stat.type';

const imports = [
    PanelComponent,
    BattleWindowContainer,
    GameMenuContainer,
    InventoryWindowContainer,
    EquipmentWindowContainer,
    PlayerStatsContainer,
    AsyncPipe,
    CommonModule,
    SkillTreeWindowContainer,
]

@Component({
    selector: 'app-game-window',
    templateUrl: 'game-window.component.html',
    styleUrls: ['./game-window.component.sass'],
    imports,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameWindowComponent {
    gameTab = new BehaviorSubject<GameTab>(GameTab.main)

    GameTab = GameTab

    constructor(private store: Store) {
    }

    resetState() {
        this.store.dispatch(resetStateAction())
    }

    changeTab(tab: GameTab) {
        this.gameTab.next(tab)
    }

    giveStat(stat: PlayerStat) {
        this.store.dispatch(updatePlayerStatsAction({ stats: [{ stat, amount: 1000 }] }))
    }
}

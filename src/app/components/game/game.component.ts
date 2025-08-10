import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PanelComponent } from '../shared/panel/panel.component'
import { BattleContainer } from "./components/battle/battle.container"
import { GameMenuContainer } from "./components/game-menu/game-menu.container"
import { InventoryContainer } from "./components/inventory/inventory.container"
import { Store } from '@ngrx/store'
import { resetStateAction } from 'app/store/actions'
import { EquipmentContainer } from "./components/equipment/equipment.container"
import { PlayerStatsContainer } from "./components/player-stats/player-stats.container"
import { BehaviorSubject } from 'rxjs'
import { GameTab } from 'enums/ids/game-tab.enum'
import { AsyncPipe, CommonModule } from '@angular/common'
import { SkillTreesContainer } from "./skill-tree-tab/skill-trees.container"
import { updatePlayerStatsAction } from '../../store/player/player.actions'
import { PlayerStat } from '../../../types/player/player-stat.type'
import { SpellsContainer } from './components/spells/spells.container'

const imports = [
    PanelComponent,
    BattleContainer,
    GameMenuContainer,
    InventoryContainer,
    EquipmentContainer,
    PlayerStatsContainer,
    AsyncPipe,
    CommonModule,
    SkillTreesContainer,
    SpellsContainer,
]

@Component({
    selector: 'app-game',
    templateUrl: 'game.component.html',
    styleUrls: ['./game.component.sass'],
    imports,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GameComponent {
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

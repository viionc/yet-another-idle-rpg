import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PanelComponent } from '../shared/panel/panel.component'
import { Store } from '@ngrx/store'
import { resetStateAction } from 'app/store/actions'
import { BehaviorSubject } from 'rxjs'
import { GameTab } from 'enums/ids/game-tab.enum'
import { AsyncPipe, CommonModule } from '@angular/common'
import { updatePlayerStatsAction } from '../../store/player/player.actions'
import { PlayerStat } from '../../../types/player/player-stat.type'
import { BattleContainer } from './battle/battle.container'
import { GameMenuContainer } from './game-menu/game-menu.container'
import { InventoryContainer } from './inventory/inventory.container'
import { EquipmentContainer } from './equipment/equipment.container'
import { PlayerStatsContainer } from './player-stats/player-stats.container'
import { SkillTreesContainer } from './skill-trees/skill-trees.container'
import { SpellsContainer } from './spells/spells.container'
import { CraftingContainer } from './crafting/crafting.container'

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
    imports: [
        imports,
        CraftingContainer,
    ],
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

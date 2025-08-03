import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { UrlPipe } from 'app/pipe/url.pipe'
import { Enemy } from 'interfaces/enemy.inteface'
import { Zone } from 'interfaces/zone.interface'
import { SpinnerComponent } from "app/components/shared/spinner/spinner.component"
import { EnemyWindowContainer } from '../enemy-window/enemy-window.container'
import { BattleNavBarContainer } from '../battle-nav-bar/battle-nav-bar.container'

@Component({
    selector: 'app-battle-window',
    templateUrl: 'battle-window.component.html',
    styleUrls: ['./battle-window.component.sass'],
    imports: [CommonModule, UrlPipe, SpinnerComponent, EnemyWindowContainer, BattleNavBarContainer],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BattleWindowComponent implements OnInit {
    @Input() currentZone: Zone
    @Input() isInCombat: boolean
    @Input() currentEnemy: Enemy

    constructor() { }

    ngOnInit() { }
}
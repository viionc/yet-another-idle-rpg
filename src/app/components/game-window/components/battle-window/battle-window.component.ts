import { CommonModule } from '@angular/common'
import { AfterViewChecked, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core'
import { UrlPipe } from 'app/pipe/url.pipe'
import { Enemy } from 'interfaces/enemy.interface'
import { Zone } from 'interfaces/zone.interface'
import { SpinnerComponent } from "app/components/shared/spinner/spinner.component"
import { EnemyWindowContainer } from '../enemy-window/enemy-window.container'
import { BattleNavBarContainer } from '../battle-nav-bar/battle-nav-bar.container'
import { DamagePopupComponent } from '../enemy-window/damage-popup/damage-popup.component'

@Component({
    selector: 'app-battle-window',
    templateUrl: 'battle-window.component.html',
    styleUrls: ['./battle-window.component.sass'],
    imports: [
        CommonModule, UrlPipe, SpinnerComponent, EnemyWindowContainer, BattleNavBarContainer,
        DamagePopupComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BattleWindowComponent implements AfterViewChecked {
    @ViewChild('enemyElement') enemyContainerContainer: EnemyWindowContainer

    @Input() currentZone: Zone
    @Input() isInCombat: boolean
    @Input() currentEnemy: Enemy

    enemyX = 0
    enemyY = 0
    private coordsSet = false

    constructor() {
    }


    ngAfterViewChecked() {
        const nativeEl = this.enemyContainerContainer?.getEnemyNativeElement()

        if (!this.coordsSet && nativeEl) {
            this.coordsSet = true
            const rect = nativeEl.getBoundingClientRect()
            this.enemyX = rect.left + rect.width + 10
            this.enemyY = rect.top + rect.height / 2
        }
    }

}

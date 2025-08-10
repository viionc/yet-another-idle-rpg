import { CommonModule } from '@angular/common'
import { AfterViewChecked, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core'
import { UrlPipe } from 'app/pipes/url.pipe'
import { Enemy } from 'interfaces/enemy.interface'
import { Zone } from 'interfaces/zone.interface'
import { SpinnerComponent } from "app/components/shared/spinner/spinner.component"
import { BattleNavBarContainer } from './battle-nav-bar/battle-nav-bar.container'
import { DamagePopupComponent } from '../damage-popup/damage-popup.component'
import { EnemyContainer } from './enemy/enemy.container'

@Component({
    selector: 'app-battle',
    templateUrl: 'battle.component.html',
    styleUrls: ['./battle.component.sass'],
    imports: [
        CommonModule, UrlPipe, SpinnerComponent, BattleNavBarContainer,
        DamagePopupComponent, EnemyContainer,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BattleComponent implements AfterViewChecked {
    @ViewChild('enemyElement') enemyContainerContainer: EnemyContainer

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

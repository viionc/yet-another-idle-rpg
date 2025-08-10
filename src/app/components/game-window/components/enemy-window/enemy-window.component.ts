import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Enemy } from 'interfaces/enemy.interface'

@Component({
    imports: [NgOptimizedImage],
    selector: 'app-enemy-window',
    templateUrl: 'enemy-window.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./enemy-window.component.sass'],
})

export class EnemyWindowContainerComponent {
    @Input() currentEnemy: Enemy
    @Input() currentEnemyHp: number
}

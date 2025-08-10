import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Enemy } from 'interfaces/enemy.interface'

@Component({
    imports: [NgOptimizedImage],
    selector: 'app-enemy',
    templateUrl: 'enemy.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./enemy.component.sass'],
})

export class EnemyComponent {
    @Input() currentEnemy: Enemy
    @Input() currentEnemyHp: number
}

import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { TranslatePipe } from 'app/pipes/i18next.pipe'
import { EnemyID } from 'enums/ids/enemy-id.enum'
import { ZoneID } from 'enums/ids/zone-id.enum'
import { Enemy } from 'interfaces/enemy.interface'
import { Zone } from 'interfaces/zone.interface'

@Component({
    selector: 'app-battle-nav-bar',
    templateUrl: 'battle-nav-bar.component.html',
    styleUrls: ['./battle-nav-bar.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, TranslatePipe],
})

export class BattleNavBarComponent {
    @Input() currentEnemy: Enemy
    @Input() currentZone: Zone
    @Input() currentWave: number
    @Input() hasAutoWaveProgressionUnlocked: boolean
    @Input() hasAutoWaveProgressionEnabled: boolean
    @Input() currentWaveKillCount: number

    @Output() onNextWave = new EventEmitter<void>()
    @Output() onPreviousWave = new EventEmitter<void>()
    @Output() enableAutoWaveProgressionAction = new EventEmitter<boolean>()

    readonly ZoneID = ZoneID
    readonly EnemyID = EnemyID

    constructor() {
    }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AbbreviatePipe } from 'app/pipe/abbreviate.pipe'
import { CalculateXpPipe } from 'app/pipe/calculate-xp.pipe'
import { TranslatePipe } from 'app/pipe/i18next.pipe'
import { PlayerStatsType } from 'app/store/player/player.reducer'

@Component({
    selector: 'app-player-stats',
    templateUrl: 'player-stats.component.html',
    imports: [CommonModule, TranslatePipe, CalculateXpPipe, AbbreviatePipe],
    styleUrls: ['./player-stats.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PlayerStatsComponent {
    @Input() playerStats: PlayerStatsType

    readonly Math = Math
}

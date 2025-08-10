import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { GameTab } from 'enums/ids/game-tab.enum'
import { TranslatePipe } from '../../../pipes/i18next.pipe'

@Component({
    selector: 'app-game-menu',
    templateUrl: 'game-menu.component.html',
    styleUrls: ['./game-menu.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, TranslatePipe],
})

export class GameMenuComponent implements OnInit {
    @Input() skillPoints: number
    @Input() level: number

    @Output() changeTab = new EventEmitter<GameTab>()

    readonly GameTab = GameTab

    constructor() {
    }

    ngOnInit() {
    }
}

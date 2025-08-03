import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-game-menu',
    templateUrl: 'game-menu.component.html',
    styleUrls: ['./game-menu.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule],
})

export class GameMenuComponent implements OnInit {
    @Input() skillPoints: number
    @Input() level: number

    constructor() { }

    ngOnInit() { }
}
import { Component, OnInit } from '@angular/core'
import { GameIntervalService } from './services/game-interval.service'
import { GameComponent } from './components/game/game.component'

@Component({
    selector: 'app-root',
    imports: [
        GameComponent,
    ],
    templateUrl: './app.html',
    styleUrl: './app.sass',
})
export class App implements OnInit {
    constructor(
        private gameService: GameIntervalService,
    ) {
    }

    async ngOnInit() {
        this.gameService.initInterval()
    }
}

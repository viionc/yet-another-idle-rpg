import { Component, OnInit } from '@angular/core';
import { GameWindowComponent } from "./components/game-window/game-window.component";
import { GameIntervalService } from './services/game-interval.service';

@Component({
    selector: 'app-root',
    imports: [GameWindowComponent],
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

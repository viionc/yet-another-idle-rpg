import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameWindowComponent } from "./components/game-window/game-window.component";
import { GameIntervalService } from './services/game-interval.service';
import { I18nService } from './services/translate.service';

@Component({
  selector: 'app-root',
  imports: [GameWindowComponent],
  templateUrl: './app.html',
  styleUrl: './app.sass',
})
export class App implements OnInit {
  constructor(
    private gameService: GameIntervalService,
    private i18next: I18nService,
  ) { }

  async ngOnInit() {
    this.gameService.initInterval()
  }
}

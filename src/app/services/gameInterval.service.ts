import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, interval, of, Subject, Subscription, tap } from 'rxjs';
import { updateTickAction } from '../store/game/game.actions';
import { selectPlayerAttackSpeed } from '../store/game';
import { clearInterval, setInterval } from 'worker-timers';

@Injectable({providedIn: 'root'})
export class GameIntervalService {
    private intervalSub!: Subscription
    private interval!: number
    private keepAlive = new Subject<void>()
    private attackSpeed = this.store.select(selectPlayerAttackSpeed)
    private tick = 0

    constructor(private store: Store) { }
    
    initInterval() {
        this.interval = setInterval(()=>{ this.keepAlive.next() }, 100)
        this.intervalSub = combineLatest([
            this.keepAlive, 
            this.attackSpeed,
        ]).pipe(
            tap(() => this.tick += 100),
            filter(([_, attackSpeed]) => (attackSpeed * 1000) / this.tick === 1),
        ).subscribe(() => {
            this.tick = 0
            console.log('attack');
        })
    }

    stopInterval() {
        clearInterval(this.interval)
        this.keepAlive.next()
        this.keepAlive.complete()
        this.intervalSub?.unsubscribe()
    }
}
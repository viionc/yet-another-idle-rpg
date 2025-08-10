import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AnimationsService } from '../../../../services/animations.service'

interface FloatingDamage {
    id: number;
    damage: number;
    isCriticalHit: boolean;
}

@Component({
    selector: 'app-damage-popup',
    templateUrl: './damage-popup.component.html',
    styleUrls: ['./damage-popup.component.sass'],
})
export class DamagePopupComponent implements OnInit, OnDestroy {
    @Input() x: number
    @Input() y: number

    floatingDamages: FloatingDamage[] = []
    private sub: Subscription
    private idCounter = 0

    constructor(private animationsService: AnimationsService) {
    }

    ngOnInit() {
        this.sub = this.animationsService.damageEvent$.subscribe(event => {
            const id = this.idCounter++
            this.floatingDamages.push({
                id,
                damage: event.damage,
                isCriticalHit: !!event.isCriticalHit,
            })

            // Remove after animation duration
            setTimeout(() => {
                this.floatingDamages = this.floatingDamages.filter(d => d.id !== id)
            }, 1000)
        })
    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }
}

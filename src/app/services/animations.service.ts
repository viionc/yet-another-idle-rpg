import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface DamageEvent {
    damage: number;
    isCriticalHit?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AnimationsService {
    private damageEventSubject = new Subject<DamageEvent>();
    damageEvent$ = this.damageEventSubject.asObservable();

    showDamage(damage: number, isCriticalHit: boolean = false) {
        this.damageEventSubject.next({ damage, isCriticalHit });
    }
}

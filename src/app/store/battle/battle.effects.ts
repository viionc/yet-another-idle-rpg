import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatestWith, switchMap } from 'rxjs';
import { defaultAttackAction, doDamageAction, startBattleAction } from './battle.actions';
import { selectPlayerStats } from '../player';
import { Store } from '@ngrx/store';

@Injectable()
export class BattleEffects {
    // startBattle$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(startBattleAction),
    //         combineLatestWith(this.store.select(select)),
    //         switchMap(([_, playerStats]) => {
    //             return []
    //         })
    //     )
    // );

    defaultAttack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(defaultAttackAction),
            combineLatestWith(this.store.select(selectPlayerStats)),
            switchMap(([_, playerStats]) => {
                const damage = playerStats.attackPower

                return [doDamageAction({ damage })]
            })
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
    ) { }
}
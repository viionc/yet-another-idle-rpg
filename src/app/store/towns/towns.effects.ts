import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'

@Injectable()
export class TownsEffects {
    constructor(
        private actions$: Actions,
    ) {
    }
}

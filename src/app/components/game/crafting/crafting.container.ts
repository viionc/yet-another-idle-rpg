import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CraftingComponent } from './crafting.component'
import { Store } from '@ngrx/store'
import { craftItemAction } from '../../../store/player/player.actions'
import { RecipeID } from '../../../../enums/ids/recipe-id.enum'
import { selectPlayerResources } from '../../../store/player'
import { AsyncPipe } from '@angular/common'

@Component({
    selector: 'app-crafting-container',
    template: `
        <app-crafting
            [playerResources]="playerResources$ | async"
            (craftItem)="craftItem($event)"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CraftingComponent,
        AsyncPipe,

    ],
})
export class CraftingContainer {
    playerResources$ = this.store.select(selectPlayerResources)

    constructor(private store: Store) {
    }

    craftItem(recipeId: RecipeID) {
        this.store.dispatch(craftItemAction({ recipeId }))
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core'
import { InventoryWindow } from "./inventory.component"
import { Store } from '@ngrx/store'
import { selectPlayerInventory } from 'app/store/player'
import { AsyncPipe } from '@angular/common'
import { equipItemAction } from 'app/store/player/player.actions'
import { InventoryItem } from 'interfaces/item.interface'

@Component({
    selector: 'app-inventory-container',
    template: `
        <app-inventory
            [inventory]="inventory$ | async"
            (equipItem)="equipItem($event)"
        />
    `,
    imports: [InventoryWindow, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InventoryContainer {
    inventory$ = this.store.select(selectPlayerInventory)

    constructor(private store: Store) {
    }

    equipItem(item: InventoryItem) {
        this.store.dispatch(equipItemAction({ item }))
    }
}

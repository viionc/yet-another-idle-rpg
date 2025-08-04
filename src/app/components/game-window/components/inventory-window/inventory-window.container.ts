import { Component, OnInit } from '@angular/core'
import { InventoryWindow } from "./inventory-window.component"
import { SlotComponent } from 'app/components/shared/slot/slot.component'
import { Store } from '@ngrx/store'
import { selectPlayerInventory } from 'app/store/player'
import { AsyncPipe } from '@angular/common'
import { equipItemAction } from 'app/store/player/player.actions'
import { InventoryItem } from 'interfaces/item.interface'

@Component({
    selector: 'app-inventory-window-container',
    template: `
        <app-inventory-window 
            [inventory]="inventory$ | async"
            (equipItem)="equipItem($event)"
        />
    `,
    imports: [InventoryWindow, AsyncPipe]
})

export class InventoryWindowContainer {
    inventory$ = this.store.select(selectPlayerInventory)

    constructor(private store: Store) { }

    equipItem(item: InventoryItem) {
        this.store.dispatch(equipItemAction({ item }))
    }
}
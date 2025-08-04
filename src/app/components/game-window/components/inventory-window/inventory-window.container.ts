import { Component, OnInit } from '@angular/core'
import { InventoryWindow } from "./inventory-window.component"
import { SlotComponent } from 'app/components/shared/slot/slot.component'
import { Store } from '@ngrx/store'
import { selectPlayerInventory } from 'app/store/player'
import { AsyncPipe } from '@angular/common'

@Component({
    selector: 'app-inventory-window-container',
    template: `
        <app-inventory-window 
            [inventory]="inventory$ | async"
        />
    `,
    imports: [InventoryWindow, AsyncPipe]
})

export class InventoryWindowContainer implements OnInit {
    inventory$ = this.store.select(selectPlayerInventory)

    constructor(private store: Store) { }

    ngOnInit() { }
}
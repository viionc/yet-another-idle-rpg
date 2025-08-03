import { Component, OnInit } from '@angular/core'
import { InventoryWindow } from "./inventory-window.component"
import { SlotComponent } from 'app/components/shared/slot/slot.component'

@Component({
    selector: 'app-inventory-window-container',
    template: `
        <app-inventory-window />
    `,
    imports: [InventoryWindow]
})

export class InventoryWindowContainer implements OnInit {
    constructor() { }

    ngOnInit() { }
}
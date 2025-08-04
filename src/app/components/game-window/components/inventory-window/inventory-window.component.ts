import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { SlotComponent } from 'app/components/shared/slot/slot.component'
import ITEM_DATA from 'data/items-data'
import { InventoryItem } from 'interfaces/item.interface'
import { InventoryItemComponent } from "./inventory-slot/inventory-slot.component"

@Component({
    selector: 'app-inventory-window',
    templateUrl: 'inventory-window.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./inventory-window.component.sass'],
    imports: [SlotComponent, CommonModule, InventoryItemComponent]
})

export class InventoryWindow implements OnInit {
    @Input() inventory: InventoryItem[]

    slots = new Array(40).fill(1)
    readonly Items = ITEM_DATA

    constructor() { }

    ngOnInit() { }
}
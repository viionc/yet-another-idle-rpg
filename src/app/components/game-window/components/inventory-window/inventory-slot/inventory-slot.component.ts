import { NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ItemTier } from 'enums/items/item-tier.enum'
import { Item } from 'interfaces/item.interface'

@Component({
    selector: 'app-inventory-slot',
    templateUrl: 'inventory-slot.component.html',
    styleUrls: ['./inventory-slot.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgOptimizedImage],
})

export class InventoryItemComponent implements OnInit {
    @Input() item: Item
    @Input() amount: number
    @Input() tier: ItemTier

    @Output() equipItem = new EventEmitter<void>()

    readonly ItemTier = ItemTier

    constructor() {
    }

    ngOnInit() {
    }
}

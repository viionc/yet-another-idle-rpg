import { CommonModule, NgOptimizedImage } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { EquipmentSlotKey } from 'enums/equipment-slot.enum'
import { ItemTier } from 'enums/items/item-tier.enum'
import { Item } from 'interfaces/item.interface'

@Component({
    selector: 'app-equipment-slot',
    templateUrl: 'equipment-slot.component.html',
    styleUrls: ['./equipment-slot.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgOptimizedImage, CommonModule]
})

export class EquipmentItemComponent {
    @Input() item: Item
    @Input() tier: ItemTier
    @Input() slotName: EquipmentSlotKey

    @Output() unequipItem = new EventEmitter<EquipmentSlotKey>()

    ItemTier = ItemTier
}

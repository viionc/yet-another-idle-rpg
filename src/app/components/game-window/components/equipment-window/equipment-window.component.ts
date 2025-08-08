import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { SlotComponent } from 'app/components/shared/slot/slot.component'
import { EquipmentSlotKey } from 'enums/equipment-slot.enum'
import { EquipmentItem } from 'interfaces/item.interface'
import { EquipmentType } from 'interfaces/player/equipment.type'
import { EquipmentItemComponent } from "./equipment-slot/equipment-slot.component"
import ITEM_DATA from 'data/items-data'

@Component({
    selector: 'app-equipment-window',
    templateUrl: 'equipment-window.component.html',
    styleUrls: ['./equipment-window.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, SlotComponent, EquipmentItemComponent]
})

export class EquipmentWindowComponent implements OnInit {
    @Output() unequipItem = new EventEmitter<EquipmentSlotKey>()

    equipmentArray: { name: EquipmentSlotKey, item: EquipmentItem }[]

    readonly Items = ITEM_DATA

    constructor() {
    }

    @Input() set equipment(equipment: EquipmentType) {
        this.equipmentArray = Object.entries(equipment).map(([name, item]) => ({
            name,
            item,
        })) as { name: EquipmentSlotKey, item: EquipmentItem }[]
    }

    ngOnInit() {
    }
}

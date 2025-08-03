import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { SlotComponent } from 'app/components/shared/slot/slot.component'

@Component({
    selector: 'app-inventory-window',
    templateUrl: 'inventory-window.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./inventory-window.component.sass'],
    imports: [SlotComponent, CommonModule]
})

export class InventoryWindow implements OnInit {

    slots = new Array(40).fill(1)
    constructor() { }

    ngOnInit() { }
}
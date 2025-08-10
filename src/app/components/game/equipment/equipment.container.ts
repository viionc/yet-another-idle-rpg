import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectPlayerEquipment } from 'app/store/player'
import { EquipmentComponent } from "./equipment.component"
import { AsyncPipe } from '@angular/common'
import { unequipItemAction } from 'app/store/player/player.actions'
import { EquipmentSlotKey } from 'enums/equipment-slot.enum'

@Component({
    selector: 'app-equipment-container',
    template: `
        <app-equipment
            [equipment]="equipment$ | async"
            (unequipItem)="unequipItem($event)"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [EquipmentComponent, AsyncPipe],
})

export class EquipmentContainer {
    equipment$ = this.store.select(selectPlayerEquipment)

    constructor(private store: Store) {
    }

    unequipItem(slot: EquipmentSlotKey) {
        this.store.dispatch(unequipItemAction({ slot }))
    }
}

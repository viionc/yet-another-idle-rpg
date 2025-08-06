import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectPlayerEquipment } from 'app/store/player'
import { EquipmentWindowComponent } from "./equipment-window.component"
import { AsyncPipe } from '@angular/common'
import { unequipItemAction } from 'app/store/player/player.actions'
import { EquipmentSlotKey } from 'enums/equipment-slot.enum'

@Component({
    selector: 'app-equipment-window-container',
    template: `
        <app-equipment-window 
            [equipment]="equipment$ | async"
            (unequipItem)="unequipItem($event)"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [EquipmentWindowComponent, AsyncPipe],
})

export class EquipmentWindowContainer {
    equipment$ = this.store.select(selectPlayerEquipment)

    constructor(private store: Store) { }

    unequipItem(slot: EquipmentSlotKey) {
        this.store.dispatch(unequipItemAction({ slot }))
    }
}
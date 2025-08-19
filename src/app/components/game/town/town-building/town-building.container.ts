import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { TownBuilding } from '../../../../../data/towns-data'
import { TownBuildingComponent } from './town-building.component'
import { ModalService } from '../../../../services/modal.service'
import { NpcID } from '../../../../../enums/map/npc-id.enum'

@Component({
    selector: 'app-town-building-container',
    template: `
        <app-town-building
            [building]="building"
            (openDialogue)="openDialogue($event)"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TownBuildingComponent,
    ],
})
export class TownBuildingContainer {
    @Input() building: TownBuilding

    private modalService = inject(ModalService)

    openDialogue(npcId: NpcID) {
        this.modalService.openDialogue(npcId)
    }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { TownID } from '../../../../enums/map/town-id.enum'
import { TranslatePipe } from '../../../pipes/i18next.pipe'
import TOWNS_DATA, { TownBuilding } from '../../../../data/towns-data'
import { TownBuildingID } from '../../../../enums/map/town-tab-id.enum'
import { TownBuildingContainer } from './town-building/town-building.container'
import { CloseButtonComponent } from '../../shared/close-button/close-button.component'

@Component({
    selector: 'app-towns',
    templateUrl: './towns.component.html',
    styleUrls: ['./towns.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TranslatePipe,
        TownBuildingContainer,
        CloseButtonComponent,
    ],
})
export class TownsComponent {
    @Input() selectedTownId: TownID
    @Input() selectedTownBuilding: TownBuilding

    @Output() selectTown = new EventEmitter<TownID>()
    @Output() selectTownBuilding = new EventEmitter<TownBuilding>()

    protected readonly TownID = TownID
    protected readonly TOWNS_DATA = TOWNS_DATA
    protected readonly TownBuildingID = TownBuildingID
}

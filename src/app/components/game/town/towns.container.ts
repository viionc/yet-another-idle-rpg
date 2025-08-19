import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { TownsComponent } from './towns.component'
import { selectSelectedTownBuildingId, selectSelectedTownId } from '../../../store/towns'
import { AsyncPipe } from '@angular/common'
import { TownID } from '../../../../enums/map/town-id.enum'
import { selectTownAction, selectTownBuildingAction } from '../../../store/towns/towns.actions'
import { Store } from '@ngrx/store'
import { TownBuilding } from '../../../../data/towns-data'

@Component({
    selector: 'app-towns-container',
    template: `
        <app-towns
            [selectedTownId]="selectedTownId$ | async"
            [selectedTownBuilding]="selectedTownBuilding$ | async"
            (selectTown)="selectTown($event)"
            (selectTownBuilding)="selectTownBuilding($event)"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TownsComponent,
        AsyncPipe,
    ],
})
export class TownsContainer {
    store = inject(Store)

    selectedTownId$ = this.store.select(selectSelectedTownId)
    selectedTownBuilding$ = this.store.select(selectSelectedTownBuildingId)


    selectTown(townId: TownID) {
        this.store.dispatch(selectTownAction({ townId }))
    }

    selectTownBuilding(townBuilding: TownBuilding) {
        this.store.dispatch(selectTownBuildingAction({ townBuilding }))
    }
}

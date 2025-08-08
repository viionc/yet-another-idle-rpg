import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-slot',
    templateUrl: 'slot.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./slot.component.sass']
})

export class SlotComponent {
}

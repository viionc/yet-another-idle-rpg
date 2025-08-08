import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-spinner',
    templateUrl: 'spinner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./spinner.component.sass'],
})

export class SpinnerComponent {
}

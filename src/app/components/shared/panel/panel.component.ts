import { ChangeDetectionStrategy, Component } from "@angular/core"

@Component({
    selector: 'app-panel',
    styleUrls: ['./panel.component.sass'],
    templateUrl: './panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
}

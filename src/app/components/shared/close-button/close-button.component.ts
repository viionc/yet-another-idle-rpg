import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'

@Component({
    selector: 'app-close-button',
    templateUrl: './close-button.component.html',
    styleUrls: ['./close-button.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgOptimizedImage,
    ],
})
export class CloseButtonComponent {
    @Output() onClose = new EventEmitter<void>()
}

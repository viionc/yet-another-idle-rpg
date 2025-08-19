// modal.component.ts
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { NPCProps } from '../../../../data/npc-data'
import { DialogueType } from '../../../../data/dialogues/types'
import { CloseButtonComponent } from '../../shared/close-button/close-button.component'
import { NpcID } from '../../../../enums/map/npc-id.enum'
import { NgOptimizedImage } from '@angular/common'
import { TranslatePipe } from '../../../pipes/i18next.pipe'

@Component({
    selector: 'app-dialogue-modal',
    templateUrl: './dialogue-modal.component.html',
    styleUrls: ['./dialogue-modal.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CloseButtonComponent,
        NgOptimizedImage,
        TranslatePipe,
    ],
})
export class DialogueModalComponent {
    @Input() npc: NPCProps
    @Input() dialogue: DialogueType

    @Output() close = new EventEmitter<void>()

    currentDialogueId = 0

    protected readonly NpcID = NpcID
}

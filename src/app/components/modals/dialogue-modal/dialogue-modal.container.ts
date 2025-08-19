// modal.component.ts
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { DialogueModalComponent } from './dialogue-modal.component'
import { DialogueType } from '../../../../data/dialogues/types'
import NPC_Data, { NPCProps } from '../../../../data/npc-data'

@Component({
    selector: 'app-dialogue-modal-container',
    template: `
        <app-dialogue-modal
            [npc]="npc"
            [dialogue]="dialogue"
            (close)="close()"
        />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DialogueModalComponent,
    ],
})
export class DialogueModalContainer {
    dialogue: DialogueType
    npc: NPCProps

    constructor(
        public dialogRef: MatDialogRef<DialogueModalContainer>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        console.log(data)
        this.npc = NPC_Data[data.npcId]
        this.dialogue = this.npc.dialogue
    }

    close() {
        this.dialogRef.close()
    }
}

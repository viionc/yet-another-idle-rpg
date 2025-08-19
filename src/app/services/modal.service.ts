import { inject, Injectable } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { NpcID } from '../../enums/map/npc-id.enum'
import { DialogueModalContainer } from '../components/modals/dialogue-modal/dialogue-modal.container'

@Injectable({ providedIn: 'root' })
export class ModalService {
    private dialog = inject(MatDialog)

    openDialogue(npcId: NpcID) {
        const config: MatDialogConfig = {
            minWidth: '800px',
            position: { top: '250px' },
            data: { npcId },
            disableClose: false,
        }

        return this.dialog.open(DialogueModalContainer, config).afterClosed()
    }
}

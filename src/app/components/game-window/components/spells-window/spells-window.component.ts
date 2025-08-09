import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SpellSlotComponent } from './spell-slot/spell-slot.component';
import { SlotComponent } from '../../../shared/slot/slot.component';
import { UnlockedSpellsType } from '../../../../../types/player/unlocked-spells.type';
import { SpellID } from '../../../../../enums/ids/spell-id.enum';

@Component({
    selector: 'app-spells-window',
    templateUrl: 'spells-window.component.html',
    styleUrls: ['spells-window.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        SpellSlotComponent,
        SlotComponent,
    ],
})
export class SpellsWindowComponent {
    readonly slots = new Array(5).fill(null)

    spellsArray: [SpellID, number][] = []

    @Input() set unlockedSpells(unlockedSpells: UnlockedSpellsType) {
        this.spellsArray = Object.entries(unlockedSpells) as any as [SpellID, number][]
    }
}

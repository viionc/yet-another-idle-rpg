import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SpellSlotComponent } from './spell-slot/spell-slot.component';
import { SlotComponent } from '../../../shared/slot/slot.component';
import { SpellID } from '../../../../../enums/ids/spell-id.enum';
import { EquippedSpell } from '../../../../../interfaces/spells/equipped-spell.interface';
import { PlayerStatsType } from '../../../../store/player/player.reducer';

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
    @Input() equippedSpells: EquippedSpell[]
    @Input() playerStats: PlayerStatsType

    @Output() castSpell = new EventEmitter<SpellID>()

    readonly slots = new Array(5).fill(null)
}

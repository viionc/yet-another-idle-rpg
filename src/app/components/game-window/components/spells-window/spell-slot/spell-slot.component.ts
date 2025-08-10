import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { TranslatePipe } from '../../../../../pipe/i18next.pipe'
import { SpellID } from '../../../../../../enums/ids/spell-id.enum'
import { UrlPipe } from '../../../../../pipe/url.pipe'
import { TooltipTemplateDirective } from 'ngx-tooltip-directives'
import SPELLS_DATA from '../../../../../../data/spells-data'
import { SpellType } from '../../../../../../enums/spell-type.enum'
import { PlayerStatsType } from '../../../../../store/player/player.reducer'
import { EquippedSpell } from '../../../../../../interfaces/spells/equipped-spell.interface'

@Component({
    selector: 'app-spell-slot',
    templateUrl: 'spell-slot.component.html',
    styleUrls: ['spell-slot.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TranslatePipe,
        UrlPipe,
        TooltipTemplateDirective,
    ],
})
export class SpellSlotComponent {
    @Input() spellId: SpellID
    @Input() equippedSpell: EquippedSpell
    @Input() spellLevel: number
    @Input() playerStats: PlayerStatsType
    @Input() isInCombat: boolean

    @Output() castSpell = new EventEmitter<SpellID>()

    protected readonly SpellID = SpellID
    protected readonly SPELLS_DATA = SPELLS_DATA
    protected readonly SpellType = SpellType

    handleCastSpell(spellId: SpellID, equippedSpell: EquippedSpell) {
        if (equippedSpell.cooldown > 0 || !this.isInCombat) return

        this.castSpell.emit(spellId)
    }

    // const passedTime = (spell.currentCooldown / getSpellCooldown(cooldown, playerStats.cooldownReduction)) * 100;
    // if (refs.reference.current) (refs.reference.current as HTMLElement).style.setProperty("--time-left", `${passedTime}%`);
}

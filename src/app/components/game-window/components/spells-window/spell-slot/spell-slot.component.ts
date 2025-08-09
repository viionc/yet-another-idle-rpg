import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslatePipe } from '../../../../../pipe/i18next.pipe';
import { SpellID } from '../../../../../../enums/ids/spell-id.enum';
import { UrlPipe } from '../../../../../pipe/url.pipe';
import { TooltipTemplateDirective } from 'ngx-tooltip-directives';
import SPELLS_DATA from '../../../../../../data/spells-data';

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
    @Input() spellLevel: number

    protected readonly SpellID = SpellID;
    protected readonly SPELLS_DATA = SPELLS_DATA
}

import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { TranslatePipe } from 'app/pipe/i18next.pipe'
import { ALL_SKILLS } from 'data/skill-tree-data'
import { SkillTreeID } from 'enums/ids/skill-tree-id.enum'
import { SkillPointID } from 'enums/ids/skill-tree-node-id.enum'
import { UrlPipe } from '../../../../pipe/url.pipe';
import { TooltipTemplateDirective } from 'ngx-tooltip-directives';

@Component({
    selector: 'app-skill-tree',
    templateUrl: 'skill-tree.component.html',
    styleUrls: ['./skill-tree.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, TranslatePipe, UrlPipe, TooltipTemplateDirective],
})

export class SkillTreeComponent {
    @Input() skillPoints: SkillPointID[][]
    @Input() skillTreeId: SkillTreeID
    @Input() unlockedSkillPoints: Partial<Record<SkillPointID, number>>

    @Output() buySkillPoint = new EventEmitter<{ id: SkillPointID, max: boolean }>()

    readonly AllSkills = ALL_SKILLS
    readonly SkillTreeID = SkillTreeID
    readonly SkillPointID = SkillPointID

    constructor() {
    }

    handleBuySkillPoint(skillPoint: SkillPointID, event: MouseEvent) {
        this.buySkillPoint.emit({ id: skillPoint, max: event.ctrlKey })
    }
}

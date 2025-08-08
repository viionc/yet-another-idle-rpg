import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { TranslatePipe } from 'app/pipe/i18next.pipe'
import { ALL_SKILLS } from 'data/skill-tree-data'
import { SkillTreeID } from 'enums/ids/skill-tree-id.enum'
import { SkillPointID } from 'enums/ids/skill-tree-node-id.enum'

@Component({
    selector: 'app-skill-tree',
    templateUrl: 'skill-tree.component.html',
    styleUrls: ['./skill-tree.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, TranslatePipe],
})

export class SkillTreeComponent {
    @Input() skillPoints: SkillPointID[][]
    @Input() skillTreeId: SkillTreeID

    readonly AllSkills = ALL_SKILLS
    readonly SkillTreeID = SkillTreeID

    constructor() {
    }
}

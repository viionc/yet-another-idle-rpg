import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { SkillTreeComponent } from "./skill-tree.component"
import { SkillTreeID } from 'enums/ids/skill-tree-id.enum'
import SKILL_TREES_DATA from 'data/skill-tree-data'
import { SkillPointID } from 'enums/ids/skill-tree-node-id.enum'

@Component({
    selector: 'app-skill-tree-container',
    template: `
        <app-skill-tree 
            [skillTreeId]="skillTreeIdVal"
            [skillPoints]="skillPoints"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SkillTreeComponent],
})

export class SkillTreeContainer {
    skillPoints: SkillPointID[][]
    skillTreeIdVal: SkillTreeID

    @Input() set skillTreeId(skillTreeId: SkillTreeID) {
        this.skillTreeIdVal = skillTreeId
        this.skillPoints = SKILL_TREES_DATA[skillTreeId].skills
    }

    constructor() { }
}
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SkillTreeID } from 'enums/ids/skill-tree-id.enum'
import { SkillTreeContainer } from "./skill-tree/skill-tree.container"

@Component({
    selector: 'app-skill-tree',
    templateUrl: 'skill-trees.component.html',
    styleUrls: ['./skill-trees.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SkillTreeContainer],
})

export class SkillTreesComponent {
    SkillTreeID = SkillTreeID
}

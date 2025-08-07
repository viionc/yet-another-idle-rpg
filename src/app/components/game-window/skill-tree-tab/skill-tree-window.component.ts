import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SkillTreeID } from 'enums/ids/skill-tree-id.enum'
import { SkillTreeContainer } from "./skill-tree/skill-tree.container"

@Component({
    selector: 'app-skill-tree-window',
    templateUrl: 'skill-tree-window.component.html',
    styleUrls: ['./skill-tree-window.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SkillTreeContainer],
})

export class SkillTreeWindowComponent {
    SkillTreeID = SkillTreeID
}
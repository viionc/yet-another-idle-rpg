import { Component, OnInit } from '@angular/core'
import { SkillTreesComponent } from "./skill-trees.component"

@Component({
    selector: 'app-skill-tree-container',
    template: `
        <app-skill-tree/>
    `,
    imports: [SkillTreesComponent],
})

export class SkillTreesContainer implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}

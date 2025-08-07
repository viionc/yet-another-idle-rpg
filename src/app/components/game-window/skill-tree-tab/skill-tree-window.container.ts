import { Component, OnInit } from '@angular/core'
import { SkillTreeWindowComponent } from "./skill-tree-window.component"

@Component({
    selector: 'app-skill-tree-window-container',
    template: `
        <app-skill-tree-window />
    `,
    imports: [SkillTreeWindowComponent]
})

export class SkillTreeWindowContainer implements OnInit {
    constructor() { }

    ngOnInit() { }
}
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { SkillTreeComponent } from "./skill-tree.component"
import { SkillTreeID } from 'enums/ids/skill-tree-id.enum'
import SKILL_TREES_DATA from 'data/skill-tree-data'
import { SkillPointID } from 'enums/ids/skill-tree-node-id.enum'
import { Store } from '@ngrx/store';
import { buySkillPointAction } from '../../../../store/player/player.actions';
import { selectUnlockedSkillPoints } from '../../../../store/player';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-skill-tree-container',
    template: `
        <app-skill-tree
            [skillTreeId]="skillTreeIdVal"
            [skillPoints]="skillPoints"
            [unlockedSkillPoints]="unlockedSkillPoints$ | async"
            (buySkillPoint)="buySkillPoint($event)"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SkillTreeComponent, AsyncPipe],
})

export class SkillTreeContainer {
    skillPoints: SkillPointID[][]
    skillTreeIdVal: SkillTreeID
    unlockedSkillPoints$ = this.store.select(selectUnlockedSkillPoints)

    constructor(private store: Store) {
    }

    @Input() set skillTreeId(skillTreeId: SkillTreeID) {
        this.skillTreeIdVal = skillTreeId
        this.skillPoints = SKILL_TREES_DATA[skillTreeId].skills
    }

    buySkillPoint({ id, max }: { id: SkillPointID; max: boolean }) {
        this.store.dispatch(buySkillPointAction({ id, buyMax: max }))
    }
}

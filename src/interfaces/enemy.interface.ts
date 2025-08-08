import { DamageElement } from 'enums/damage-element.enum'
import { EnemyDrop } from './enemy-drop.interface'
import { EnemyID } from 'enums/ids/enemy-id.enum'

export interface Enemy {
    id: EnemyID
    maxHp: number
    experience: number
    weakness: DamageElement
    drops: EnemyDrop[]
    url: string
    isBossEnemy?: boolean
}

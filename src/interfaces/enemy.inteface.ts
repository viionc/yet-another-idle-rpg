import { DamageElement } from 'enums/damage-element.enum'
import { EnemyDrop } from './enemy-drop.interface'

export interface Enemy {
    maxHp: number
    experience: number
    weakness: DamageElement
    drops: EnemyDrop[]
    url: string
    isBossEnemy?: boolean
}

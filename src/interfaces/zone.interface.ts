import { EnemyID } from 'enums/ids/enemy-id.enum'
import { ZoneID } from 'enums/ids/zone-id.enum'

export type Zone = {
    url: string
    enemies: EnemyID[]
    maxWave: number
    enemiesPerWave: number
    bossEnemyId: EnemyID
    nextZoneId?: ZoneID
    previousZoneId?: ZoneID
    id: ZoneID
}

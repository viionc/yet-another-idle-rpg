import { createAction, props } from '@ngrx/store'
import { EnemyID } from 'enums/ids/enemy-id.enum'
import { ZoneID } from 'enums/ids/zone-id.enum'

export const startBattleAction = createAction('[Battle] Start')
export const changeZoneAction = createAction('[Battle] Change Zone', props<{ zoneId: ZoneID }>())
export const defaultAttackAction = createAction('[Battle] Default Attack')
export const doDamageAction = createAction('[Battle] Do Damage', props<{ damage: number }>())
export const resetEnemyAction = createAction('[Battle] Reset Enemy')
export const updateEnemyHpAction = createAction('[Battle] Update Enemy Hp', props<{ newHp: number }>())
export const battleEndedAction = createAction('[Battle] Ended', props<{
    enemyId: EnemyID,
    zoneId: ZoneID,
    currentWave: number
}>())
export const nextWaveAction = createAction('[Battle] Next Wave')
export const previousWaveAction = createAction('[Battle] Previous Wave')

import { createAction, props } from '@ngrx/store';
import { ZoneID } from 'enums/ids/zone-id.enum';

export const startBattleAction = createAction('[Battle] Start')
export const changeZoneAction = createAction('[Battle] Change Zone', props<{ zoneId: ZoneID }>())
export const defaultAttackAction = createAction('[Battle] Default Attack')
export const doDamageAction = createAction('[Battle] Do damage', props<{ damage: number }>())
import { ZoneID } from '../../enums/ids/zone-id.enum';

type WaveNumber = number
type KillCount = number

export type ZonesProgression = Partial<Record<ZoneID, Record<WaveNumber, KillCount>>>

import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { switchMap, withLatestFrom } from 'rxjs'
import {
    addSpellToSpellBarAction,
    battleEndedAction,
    castSpellAction,
    defaultAttackAction,
    equipSpellAction,
    nextWaveAction,
    updateEnemyHpAction,
    updateEquippedSpellAction,
    updateEquippedSpellsAction,
} from './battle.actions'
import { selectPlayerStats } from '../player'
import { Action, Store } from '@ngrx/store'
import {
    selectCurrentEnemy,
    selectCurrentEnemyHp,
    selectCurrentWave,
    selectCurrentWaveKillCount,
    selectCurrentZoneId,
    selectEquippedSpells,
    selectHasAutoWaveProgressionEnabled,
} from '.'
import ZONES_DATA from '../../../data/zones-data';
import SPELLS_DATA, { SpellSupportStatBuffEffectProps } from '../../../data/spells-data';
import { EquippedSpell } from '../../../interfaces/spells/equipped-spell.interface';
import { SpellType } from '../../../enums/spell-type.enum';
import { SpellID } from '../../../enums/ids/spell-id.enum';
import { updatePlayerStatsAction } from '../player/player.actions';
import { updateTickAction } from '../actions';

@Injectable()
export class BattleEffects {
    defaultAttack$ = createEffect(() =>
        this.actions$.pipe(
            ofType(defaultAttackAction),
            withLatestFrom(
                this.store.select(selectCurrentZoneId),
                this.store.select(selectCurrentWave),
                this.store.select(selectHasAutoWaveProgressionEnabled),
                this.store.select(selectPlayerStats),
                this.store.select(selectCurrentEnemy),
                this.store.select(selectCurrentEnemyHp),
                this.store.select(selectCurrentWaveKillCount),
            ),
            switchMap(([{ isDoubleAttack }, currentZoneId, currentWave, hasAutoWaveProgressionEnabled, playerStats, currentEnemy, currentEnemyHp, killCount]) => {
                let damage = playerStats.attackPower
                let isCrit = false
                if (playerStats.critChance) {
                    const critRoll = Math.floor(Math.random() * 100) + 1; // 1 - 100
                    if (playerStats.critChance >= critRoll) {
                        isCrit = true
                        damage = Math.ceil(damage * playerStats.critChance)
                    }
                }

                damage = isDoubleAttack ? damage * 2 : damage

                const hpAfterDamage = currentEnemyHp - damage
                const isDead = hpAfterDamage <= 0

                const actions: any[] = [updateEnemyHpAction({ newHp: hpAfterDamage <= 0 ? 0 : hpAfterDamage })]

                if (!isDead) return actions

                actions.push(battleEndedAction({
                    enemyId: currentEnemy.id,
                    zoneId: currentZoneId,
                    currentWave,
                }))

                const { enemiesPerWave, maxWave } = ZONES_DATA[currentZoneId]
                const isLastWave = currentWave === maxWave
                let shouldProgressToNextWave = hasAutoWaveProgressionEnabled && (((killCount + 1) >= enemiesPerWave) || isLastWave)

                if (shouldProgressToNextWave) actions.push(nextWaveAction())

                return actions
            }),
        ),
    )

    equipSpell$ = createEffect(() =>
        this.actions$.pipe(
            ofType(equipSpellAction),
            withLatestFrom(this.store.select(selectPlayerStats)),
            switchMap(([{ spellId }, playerStats]) => {
                const spellData = SPELLS_DATA[spellId]
                const spellToEquip: EquippedSpell = {
                    spellId,
                    spellType: spellData.effect.type,
                    cooldown: 0,
                }

                if (spellData.effect.type === SpellType.buff) {
                    spellToEquip.duration = 0
                }

                return [addSpellToSpellBarAction({ ...spellToEquip })]
            }),
        ),
    )

    castSpell$ = createEffect(() =>
        this.actions$.pipe(
            ofType(castSpellAction),
            withLatestFrom(
                this.store.select(selectPlayerStats),
            ),
            switchMap(([{ spellId }, playerStats]) => {
                const spellData = SPELLS_DATA[spellId]

                const { spellCooldownReduction, increasedSpellDuration } = playerStats

                const spellToUpdate = {
                    spellId,
                    cooldown: spellData.baseCooldown - spellCooldownReduction,
                } as EquippedSpell

                const actions: Action[] = []

                if (spellId === SpellID.doubleAttack) {
                    actions.push(
                        defaultAttackAction({ isDoubleAttack: true }),
                    )
                }

                if (spellData.effect.type === SpellType.buff) {
                    const statsToUpdate = {
                        stat: spellData.effect.stat,
                        amount: spellData.effect.amount,
                    }

                    spellToUpdate.duration = spellData.effect.duration + increasedSpellDuration

                    actions.push(updatePlayerStatsAction({ stats: [statsToUpdate] }))
                }

                return [
                    ...actions,
                    updateEquippedSpellAction({ ...spellToUpdate }),
                ]

            }),
        ))

    updateTick$ = createEffect(() => this.actions$.pipe(
        ofType(updateTickAction),
        withLatestFrom(this.store.select(selectEquippedSpells)),
        switchMap(([_, equippedSpells]) => {
            const actions: Action[] = []

            if (!equippedSpells.length) return actions

            let updated = false

            const newSpells = equippedSpells.map(s => {
                const spell = { ...s }

                if (spell.cooldown <= 0) return spell

                updated = true

                spell.cooldown = spell.cooldown - 1

                if (spell.duration <= 0 || spell.spellType !== SpellType.buff) return spell

                spell.duration = spell.duration - 1

                if (spell.duration > 0) return spell

                const spellData = SPELLS_DATA[spell.spellId]
                const spellEffect = spellData.effect as SpellSupportStatBuffEffectProps
                const statsToUpdate = {
                    stat: spellEffect.stat,
                    amount: -1 * spellEffect.amount,
                }

                actions.push(updatePlayerStatsAction({ stats: [statsToUpdate] }))

                return spell
            })

            if (updated) actions.push(updateEquippedSpellsAction({ equippedSpells: newSpells }))

            return actions
        }),
    ))

    constructor(
        private actions$: Actions,
        private store: Store,
    ) {
    }
}

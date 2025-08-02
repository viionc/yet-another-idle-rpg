import { createReducer, on, State, Action, createFeature } from "@ngrx/store";
import { PlayerStat } from "../../../types/player/playerStat.type";
import * as actions from './player.actions'

export type PlayerStatsType = Record<PlayerStat, number>

interface PlayerState {
    stats: PlayerStatsType
}

const initialState: PlayerState = {
    stats: {
        // exp
        experience: 0,
        xpMultiplier: 1,
        level: 1,
        unspentSkillPoints: 0,
        // gold
        goldCoins: 0,
        goldCoinsMultiplier: 1,
        // attack
        attackPower: 1,
        attackSpeed: 3,
        // magic
        magicDamage: 0,
        mana: 5,
        maxMana: 5,
        currentManaRegenTimer: 0,
        manaRegenRate: 30 * 1000, // 30 seconds
        spellCooldownReduction: 0,
        increasedSpellDuration: 0,
        // crit
        critChance: 0,
        critMulti: 1.2,
        // damage type increases
        extraFireDamage: 0,
        extraAirDamage: 0,
        extraWaterDamage: 0,
        extraDarkDamage: 0,
        extraEarthDamage: 0,
        extraLightDamage: 0,
        extraPhysicalDamage: 0,
        // shop?
        shopRefreshCooldown: 1000 * 60 * 10, // 10 minutes
        currentShopRefreshCooldown: 0,

    }
}

const reducer = createReducer(
    initialState,
    on(actions.updatePlayerStatAction, (state, { stat, amount }) => updateStat(state, stat, amount)),
);

export const playerFeature = createFeature({
    name: 'player',
    reducer,
});

const updateStat = (state: PlayerState, stat: PlayerStat, amount: number) => {
    let statToUpdate = state.stats[stat]

    switch (stat) {
        case 'attackSpeed':
        case 'manaRegenRate':
        case 'shopRefreshCooldown':
            statToUpdate -= amount
            break
        default:
            statToUpdate += amount
  }

  return {
    ...state,
    stats: {
        ...state.stats,
        [stat]: statToUpdate
    }
  }
}

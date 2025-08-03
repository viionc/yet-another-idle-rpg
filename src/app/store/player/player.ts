import { PlayerStatsType } from './player.reducer'

export const statsInitialState: PlayerStatsType = {
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
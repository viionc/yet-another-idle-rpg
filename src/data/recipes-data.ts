import { ItemID } from '../enums/ids/item-id.enum'
import { RecipeID } from '../enums/ids/recipe-id.enum'

export type CraftingRecipe = {
    id: RecipeID
    unlockRequirement: null
    itemsNeeded: RecipeCost[]
    createsAmount: number
    itemId: ItemID
}

export type RecipeCost = {
    id: ItemID
    amount: number
}

const RECIPES_DATA: Partial<Record<RecipeID, CraftingRecipe>> = {
    [RecipeID.makeshiftClub]: {
        id: RecipeID.makeshiftClub,
        itemId: ItemID.makeshiftClub,
        unlockRequirement: null,
        itemsNeeded: [{ id: ItemID.stick, amount: 10 }],
        createsAmount: 1,
    },
    [RecipeID.turtleShellChest]: {
        id: RecipeID.turtleShellChest,
        itemId: ItemID.turtleShellChest,
        unlockRequirement: null,
        itemsNeeded: [{ id: ItemID.turtleShell, amount: 25 }],
        createsAmount: 1,
    },
    [RecipeID.turtleShellLegs]: {
        id: RecipeID.turtleShellLegs,
        itemId: ItemID.turtleShellLegs,
        unlockRequirement: null,
        itemsNeeded: [{ id: ItemID.turtleShell, amount: 20 }],
        createsAmount: 1,
    },
    [RecipeID.turtleShellBoots]: {
        id: RecipeID.turtleShellBoots,
        itemId: ItemID.turtleShellBoots,
        unlockRequirement: null,
        itemsNeeded: [{ id: ItemID.turtleShell, amount: 10 }],
        createsAmount: 1,
    },
    [RecipeID.turtleShellGloves]: {
        id: RecipeID.turtleShellGloves,
        itemId: ItemID.turtleShellGloves,
        unlockRequirement: null,
        itemsNeeded: [{ id: ItemID.turtleShell, amount: 10 }],
        createsAmount: 1,
    },
    [RecipeID.turtleShellHelmet]: {
        id: RecipeID.turtleShellHelmet,
        itemId: ItemID.turtleShellHelmet,
        unlockRequirement: null,
        itemsNeeded: [{ id: ItemID.turtleShell, amount: 10 }],
        createsAmount: 1,
    },
}

export default RECIPES_DATA

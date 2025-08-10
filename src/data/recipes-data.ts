import { ItemID } from '../enums/ids/item-id.enum'

export type CraftingRecipeProps = {
    unlockRequirement: null
    itemsNeeded: RecipeCost[]
    createsAmount: number
};

export type RecipeCost = {
    id: ItemID
    amount: number
};

const RECIPES_DATA: Partial<Record<ItemID, CraftingRecipeProps>> = {
    [ItemID.makeshiftClub]: {
        unlockRequirement: null,
        itemsNeeded: [{ id: ItemID.stick, amount: 10 }],
        createsAmount: 1,
    },
    [ItemID.turtleShellChest]: {
        unlockRequirement: null,
        itemsNeeded: [{ id: ItemID.turtleShell, amount: 25 }],
        createsAmount: 1,
    },
    [ItemID.turtleShellLegs]: {
        unlockRequirement: null,
        itemsNeeded: [{ id: ItemID.turtleShell, amount: 20 }],
        createsAmount: 1,
    },
    [ItemID.turtleShellBoots]: {
        unlockRequirement: null,
        itemsNeeded: [{ id: ItemID.turtleShell, amount: 10 }],
        createsAmount: 1,
    },
    [ItemID.turtleShellGloves]: {
        unlockRequirement: null,
        itemsNeeded: [{ id: ItemID.turtleShell, amount: 10 }],
        createsAmount: 1,
    },
    [ItemID.turtleShellHelmet]: {
        unlockRequirement: null,
        itemsNeeded: [{ id: ItemID.turtleShell, amount: 10 }],
        createsAmount: 1,
    },
}

export default RECIPES_DATA

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import RECIPES_DATA, { CraftingRecipe } from '../../../../data/recipes-data'
import { RecipeSlot } from './recipe-slot/recipe-slot.component'
import { SlotComponent } from '../../shared/slot/slot.component'
import { RecipeID } from '../../../../enums/ids/recipe-id.enum'
import { TranslatePipe } from '../../../pipes/i18next.pipe'
import { ItemID } from '../../../../enums/ids/item-id.enum'
import { PlayerResourceInventoryType } from '../../../../types/player/player-resource-inventory.type'

@Component({
    selector: 'app-crafting',
    templateUrl: './crafting.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./crafting.component.sass'],
    imports: [
        RecipeSlot,
        SlotComponent,
        TranslatePipe,
    ],
})
export class CraftingComponent {
    @Input() playerResources: PlayerResourceInventoryType

    @Output() craftItem = new EventEmitter<RecipeID>()

    recipesArray: CraftingRecipe[] = Object.values(RECIPES_DATA)

    recipeToCraft: RecipeID
    protected readonly RECIPES_DATA = RECIPES_DATA
    protected readonly ItemID = ItemID

    selectItemToCraft(recipe: RecipeID) {
        this.recipeToCraft = recipe
    }

    handleCraftItem(recipe: CraftingRecipe) {
        let cantCraft = false

        recipe.itemsNeeded.forEach((itemNeeded) => {
            const ownedResource = this.playerResources[itemNeeded.id]

            if (!ownedResource || ownedResource.amount < itemNeeded.amount) cantCraft = true
        })

        if (cantCraft) return

        this.craftItem.emit(recipe.id)
    }
}

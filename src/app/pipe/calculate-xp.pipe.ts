import { Pipe, PipeTransform } from '@angular/core'

export const calculatXp = (level: number) => (50 * (Math.pow(level, 3) - 6 * Math.pow(level, 2) + 17 * level - 12)) / 3

@Pipe({
    name: 'calculateXp',
    pure: false,
})
export class CalculateXpPipe implements PipeTransform {
    transform(level: number) {
        //Tibia XP formula
        return calculatXp(level)
    };
}
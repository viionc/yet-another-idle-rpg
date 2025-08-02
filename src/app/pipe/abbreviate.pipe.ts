import { Pipe, PipeTransform } from '@angular/core';
import { abbreviateNumber } from 'js-abbreviation-number'

@Pipe({
    name: 'abbr',
    pure: false,
})
export class AbbreviatePipe implements PipeTransform {
    private readonly symbols = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No']
    transform(number: number) {

        return abbreviateNumber(number, 2, { symbols: this.symbols })
    }
}
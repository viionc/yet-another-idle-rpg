import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'url',
    pure: false,
})
export class UrlPipe implements PipeTransform {
    transform(url: string) {
        return `url(${url})`
    }
}

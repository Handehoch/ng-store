import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cutter',
    standalone: true,
})
export class StringCutterPipe implements PipeTransform {
    transform(value: string, size: number): string {
        return value.substr(0, size);
    }
}

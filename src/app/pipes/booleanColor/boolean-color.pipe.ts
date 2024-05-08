import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanColor',
})
export class BooleanColorPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'SI' : 'NO';
  }
}

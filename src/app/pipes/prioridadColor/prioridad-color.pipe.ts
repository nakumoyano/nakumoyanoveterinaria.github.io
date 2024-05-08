import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prioridadColor',
})
export class PrioridadColorPipe implements PipeTransform {
  transform(value: any): string {
    if (value == 1) {
      return 'green';
    } else if (value == 3) {
      return 'red';
    } else if (value == 2) {
      return 'orange';
    } else {
      return '';
    }
  }
}

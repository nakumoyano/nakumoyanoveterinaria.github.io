import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cambioDeColor',
})
export class CambioDeColorPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 40) {
      return 'green';
    } else if (value <= 10) {
      return 'red';
    } else if (value <= 40 && value >= 10) {
      return 'orange';
    } else {
      return '';
    }
  }
}

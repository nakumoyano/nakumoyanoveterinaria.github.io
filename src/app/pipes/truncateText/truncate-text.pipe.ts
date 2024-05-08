import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
})
export class TruncateTextPipe implements PipeTransform {
  transform(description: string): string {
    const maxLength = 10;

    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }

    return description;
  }
}

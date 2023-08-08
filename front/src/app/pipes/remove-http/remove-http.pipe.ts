import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHttp',
})
export class RemoveHttpPipe implements PipeTransform {

   transform(value: string | undefined): string {
      return value === undefined ? '' : value.replace(/(http:\/\/|https:\/\/)/gi, '');
    }
}

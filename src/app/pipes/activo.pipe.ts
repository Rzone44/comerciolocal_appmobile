import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activo'
})
export class ActivoPipe implements PipeTransform {

  transform(items: any): any {
    if (!items) {
          return items;
    }
    return items.filter(item => item.activo == 1);
  }

}

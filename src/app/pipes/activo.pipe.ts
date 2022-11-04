import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activo'
})
export class ActivoPipe implements PipeTransform {

  transform(items: any): any {
    console.log(items);
    if (!items) {
          return items;
    }
    debugger;
    console.log(items.filter(item => item.activo == 1));
    return items.filter(item => item.activo == 1);
  }

}

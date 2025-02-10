import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Product[], args: keyof Product = 'title'): Product[] {
    return value.sort((a, b) => {
      if (!a[args]) {
        return 1;
      }
      if (!b[args]) {
        return -1;
      }
      return a[args] > b[args]
        ? 1
        : a[args] < b[args]
          ? -1
          : 0;
    });
  }

}

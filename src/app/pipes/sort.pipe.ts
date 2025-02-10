import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Product[], args: keyof Product = 'title'): Product[] {
    return value.sort((a, b) => {
      return a[args] > b[args]
        ? 1
        : a[args] < b[args]
          ? -1
          : 0;
    });
  }

}

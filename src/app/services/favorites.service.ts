import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from '../models/product';
import { ProductViewService } from './product-view.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService extends ProductsService{

  constructor() {
    super();
  }

  override getProducts(): Product[] {
    return super.getProducts().slice(1, 3);
  }
}

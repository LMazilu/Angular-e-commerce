import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from '../models/product';

@Injectable()
export class ProductViewService {
  private product: Product | undefined;

  constructor(private productsService : ProductsService) { }

  getProduct(id: number): Product | undefined {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      if(!this.product) {
        this.product = products.find(product => product.id === id);
      }
    });
    return this.product;
  }
}

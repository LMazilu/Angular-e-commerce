import { ResolveFn } from '@angular/router';
import { Product } from '../models/product';
import { inject } from '@angular/core';
import { ProductsService } from '../services/products.service';

export const productsResolver: ResolveFn<Product[]> = (route, state) => {

  const productService = inject(ProductsService);
  const limit = route.queryParamMap.get('limit');

  return productService.getProducts(Number(limit));
};

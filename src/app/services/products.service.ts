import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      title: 'Microfono',
      price: 79,
      categories: { 1: 'Audio', 2: 'Computer', 3: 'Periferiche' },
    },
    {
      id: 3,
      title: 'Mouse',
      price: 29,
      categories: { 2: 'Computer', 3: 'Periferiche' },
    },
    { id: 4, title: 'Monitor', price: 249, categories: { 2: 'Computer' } },
    { id: 5, title: 'Tastiera', price: 119, categories: { 2: 'Computer' } },
    {
      id: 6,
      title: 'Webcam',
      price: 99,
      categories: { 2: 'Computer', 4: 'Video' },
    },
  ];

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}

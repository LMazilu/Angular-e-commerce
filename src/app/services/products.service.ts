import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService{

  constructor() { }
  
  getProducts() : Product[] {
    return [
      { id: 1, title: 'Microfono', price: 79, categories: { 1: 'Audio', 2: 'Computer', 3: 'Periferiche' } },
      { id: 3, title: 'Mouse', price: 29, categories: { 2: 'Computer', 3: 'Periferiche' } },
      { id: 4, title: 'Monitor', price: 249, categories: { 2: 'Computer' } },
      { id: 5, title: 'Tastiera', price: 119, categories: { 2: 'Computer' } },
      { id: 6, title: 'Webcam', price: 99, categories: { 2: 'Computer', 4: 'Video' } },
    ];
  }
}

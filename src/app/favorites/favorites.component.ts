import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { favoritesFactory } from '../favorites';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { ProductViewService } from '../services/product-view.service';

@Component({
  selector: 'app-favorites',
  imports: [SlicePipe],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  providers: [{provide:ProductsService, useFactory: favoritesFactory(true)}],
})
export class FavoritesComponent implements OnInit {
  products : Product[] = [];
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }
}

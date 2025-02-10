import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { Product } from '../models/product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../pipes/sort.pipe';
import { ProductsService } from '../services/products.service';
import { FavoritesComponent } from '../favorites/favorites.component';
import { ProductViewComponent } from '../product-view/product-view.component';
import { favoritesFactory } from '../favorites';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductDetailComponent,
    SortPipe,
    FavoritesComponent,
    ProductViewComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [{provide:ProductsService, useFactory: favoritesFactory(false)}],
})
export class ProductListComponent implements OnInit, OnChanges, OnInit {
  products: Product[] = [];
  currentClassesObject: object = {
    star: true,
    active: false,
  };
  selectedProduct: Product | undefined;
  productDetail = viewChild(ProductDetailComponent);
  private productsService: ProductsService = inject(ProductsService);

  ngOnInit(): void {
    console.log('ProductDetailComponent initialized');
    this.products = this.productsService.getProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const product = changes['product'];
    if (!product.isFirstChange()) {
      const oldValue = product.previousValue;
      const newValue = product.currentValue;
      console.log(`Product changed from ${oldValue} to ${newValue}`);
    }
  }

  onAdded(product: Product): void {
    alert(`${product.title} aggiunto al carrello`);
  }

  testAddProduct() {
    this.products = [
      ...this.products,
      {
        id: 5,
        title: 'Nuovo prodotto',
        price: 99,
        categories: { 2: 'Computer', 4: 'Video' },
      },
    ];
  }
}

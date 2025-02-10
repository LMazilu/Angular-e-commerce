import {
  Component,
  DestroyRef,
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
import { ProductViewComponent } from '../product-view/product-view.component';
import { Observable, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductDetailComponent,
    SortPipe,
    ProductViewComponent,
    AsyncPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [{provide:ProductsService, useClass: ProductsService},],
})
export class ProductListComponent implements OnInit, OnChanges, OnInit {
  currentClassesObject: object = {
    star: true,
    active: false,
  };
  selectedProduct: Product | undefined;
  productDetail = viewChild(ProductDetailComponent);
  private productsService: ProductsService = inject(ProductsService);
  private productSubscription: Subscription | undefined;
  private destroyRef = inject(DestroyRef);
  products$ : Observable<Product[]> | undefined;

  ngOnInit(): void {
    console.log('ProductDetailComponent initialized');
    this.getProducts();
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

  private getProducts() {
    // this.productSubscription = this.productsService.getProducts()
    // .pipe(takeUntilDestroyed(this.destroyRef))
    // .subscribe((products) => {
    //   this.products = products;
    // });
    this.products$ = this.productsService.getProducts();
  }
}

import { Component, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../models/product';
import { SortPipe } from '../pipes/sort.pipe';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductsService } from '../services/products.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [SortPipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [],
})
export class ProductListComponent {
  private route = inject(ActivatedRoute);
  products = toSignal(
    this.route.data.pipe(switchMap((data) => of(data['products']))),
    { initialValue: [] }
  );
  // products = toSignal(
  //   this.route.queryParamMap.pipe(
  //     switchMap((params) => {
  //       return inject(ProductsService).getProducts(Number(params.get('limit')));
  //     })
  //   ),
  //   { initialValue: [] }
  // );
  selectedProduct: Product | undefined;
  productDetail = viewChild(ProductDetailComponent);

  constructor() {}

  onAdded(): void {
    alert(`${this.selectedProduct?.title} aggiunto al carrello`);
  }
}

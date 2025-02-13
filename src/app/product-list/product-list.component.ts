import { CurrencyPipe } from '@angular/common';
import { Component, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatMiniFabButton } from '@angular/material/button';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Product } from '../models/product';
import { SortPipe } from '../pipes/sort.pipe';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  imports: [
    SortPipe,
    CurrencyPipe,
    RouterLink,
    MatMiniFabButton,
    MatIcon,
    MatCardModule,
    MatTableModule,
    MatButtonToggle,
    MatButtonToggleGroup,
  ],
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
  selectedProduct: Product | undefined;
  productDetail = viewChild(ProductDetailComponent);
  columnNames = ['title', 'price'];

  constructor() {}

  onAdded(): void {
    alert(`${this.selectedProduct?.title} aggiunto al carrello`);
  }
}

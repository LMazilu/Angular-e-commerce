import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import {
  MatError,
  MatFormField,
  MatInput,
  MatSuffix,
} from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatChipSet, MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule,
    FormsModule,
    MatButton,
    MatInput,
    MatFormField,
    MatError,
    MatIcon,
    MatSuffix,
    MatIconButton,
    MatChipSet,
    MatChip
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductDetailComponent implements OnInit {
  id = input<string>();
  product$: Observable<Product> | undefined;
  price: number | undefined;

  constructor(
    private productsService: ProductsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.product$ = this.productsService.getProduct(Number(this.id()!));

    /**2. soluzione */
    // const id = this.route.snapshot.params['id'];
    // this.product$ = this.productsService.getProduct(Number(id));

    /** 1. soluzione */
    // this.product$ = this.route.paramMap.pipe(
    //   switchMap((params) => {
    //     return this.productsService.getProduct(Number(params.get('id')));
    //   })
    // );
  }

  addToCart(id: number) {
    this.cartService.addProduct(id).subscribe();
  }

  changePrice(product: Product) {
    if (product.id !== undefined) {
      this.productsService
        .updateProduct(product.id, this.price!)
        .subscribe(() => {
          this.router.navigate(['/products']);
        });
    }
  }

  remove(product: Product) {
    this.productsService.deleteProduct(product.id!).subscribe(() => {
      // () => this.delete.emit()4
      this.router.navigate(['/products']);
    });
  }
}

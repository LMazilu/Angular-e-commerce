import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart',
  imports: [ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartForm = new FormGroup({
    products: new FormArray<FormControl<number>>([]),
  });

  products: Product[] = [];

  cartService = inject(CartService);
  productsService = inject(ProductsService);

  ngOnInit() {
    this.getProducts();
    this.buildForm();
  }

  private getProducts() {
    this.productsService.getProducts().subscribe((p) =>
      this.cartService.cart?.products.forEach((i) => {
        const product = p.find((prodotti) => prodotti.id === i.productId);
        if (product) {
          this.products.push(product);
        }
      })
    );
  }

  private buildForm() {
    this.products.forEach(() =>
      this.cartForm.controls.products.push(
        new FormControl(1, { nonNullable: true })
      )
    );
  }
}

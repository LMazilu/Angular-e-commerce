import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import { APP_SETTINGS } from '../app.settings';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart | undefined;
  private cartUrl = inject(APP_SETTINGS).apiUrl + '/carts';
  private http = inject(HttpClient);

  constructor() { }

  addProduct(productId: number): Observable<Cart> {
    const cartProduct = { productId : productId, quantity: 1 };
    return defer(() =>
      !this.cart
        ? this.http.post<Cart>(this.cartUrl, { products: [cartProduct] })
        : this.http.patch<Cart>(`${this.cartUrl}/${this.cart.id}`, { products: [...this.cart.products, cartProduct] })
    ).pipe(map(cart => this.cart = cart));
  }
}

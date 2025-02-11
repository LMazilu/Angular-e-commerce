import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, retry, tap } from 'rxjs';
import { APP_SETTINGS } from '../app.settings';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = inject(APP_SETTINGS).apiUrl + '/products';

  private products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts(limit?:number): Observable<Product[]> {
    if (this.products.length === 0) {
      const options = new HttpParams().set('limit', limit || 10);
      return this.http
        .get<Product[]>(this.productsUrl, { params: options })
        .pipe(
          map((products) => {
            this.products = products;
            return this.products;
          }),
          retry(2)
        );
    }
    return of(this.products);
  }

  getProduct(id: number): Observable<Product> {
    const product = this.products.find((p) => p.id === id);
    return of(product!);
  }

  addProduct(newProduct: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, newProduct).pipe(
      map((product) => {
        this.products.push(product);
        return product;
      })
    );
  }

  updateProduct(id: number, price: number): Observable<Product> {
    return this.http
      .patch<Product>(`${this.productsUrl}/${id}`, { price })
      .pipe(
        map((p) => {
          const index = this.products.findIndex((p) => p.id == id);
          this.products[index].price = p.price;
          return p;
        })
      );
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.productsUrl}/${id}`).pipe(
      tap(() => {
        const index = this.products.findIndex((product) => product.id === id);
        this.products.splice(index, 1);
      })
    );
  }

}

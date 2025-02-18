import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-featured',
  imports: [CommonModule, MatCardModule, MatButton],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css',
})
export class FeaturedComponent implements OnInit {
  private productsService = inject(ProductsService);
  product$: Observable<Product> | undefined;

  ngOnInit(): void {
    this.product$ = this.productsService.getFeatured();
  }
}

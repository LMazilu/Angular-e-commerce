import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  ViewEncapsulation,
} from '@angular/core';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductDetailComponent
{
  product: InputSignal<Product | undefined> = input<Product>();
  added: OutputEmitterRef<Product> = output<Product>();


  get productTitle() {
    return this.product()!.title;
  }

  addToCart() {
    this.added.emit(this.product()!);
  }
}

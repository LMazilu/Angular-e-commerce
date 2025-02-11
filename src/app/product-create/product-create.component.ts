import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { maxPriceValidator } from '../validators/max-price.validator';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule, MatButton, MatInput, MatFormField, MatError, MatLabel],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
  providers: [],
})
export class ProductCreateComponent implements OnInit {
  productForm:
    | FormGroup<{
        title: FormControl<string>;
        price: FormControl<number | undefined>;
        category: FormControl<string>;
      }>
    | undefined;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private builder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.buildForm();

    this.productForm?.controls.category.valueChanges.subscribe(() => {
      this.productForm?.controls.price.reset();
    });
  }

  buildForm() {
    this.productForm = this.builder.nonNullable.group({
      title: ['', { nonNullable: true, validators: Validators.required }],
      price: this.builder.nonNullable.control<number | undefined>(undefined, {
        validators: [
          Validators.required,
          Validators.min(1),
          maxPriceValidator(1000),
        ],
      }),
      category: [''],
    });
  }

  createProduct() {
    this.productService
      .addProduct(this.productForm!.value)
      .subscribe(() => this.router.navigate(['/products']));
  }
}

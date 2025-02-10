import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup<{
    title: FormControl<string>;
    price: FormControl<number | undefined>;
    category: FormControl<string>;
  }> | undefined;

  // productForm = new FormGroup({
  //   title: new FormControl('', { nonNullable: true }),
  //   price: new FormControl<number | undefined>(undefined, {
  //     nonNullable: true,
  //   }),
  //   category: new FormControl('', { nonNullable: true }),
  //   // extra: new FormGroup({
  //   //   image: new FormControl(''),
  //   //   description: new FormControl(''),
  //   // }),
  // });

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void { 
    this.buildForm();
  }
  
  buildForm() {
    this.productForm = this.formBuilder.nonNullable.group({
      title: [''],
      price: this.formBuilder.nonNullable.control<number | undefined>(undefined),
      category: ['']
    });
  }

  createProduct() {
    this.productsService
      .addProduct(this.productForm!.value)
      .subscribe(() => this.router.navigate(['/products']));
  }
}

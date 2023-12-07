import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartModel } from 'src/app/core/models/cart.interface';
import { ProductsModel } from 'src/app/core/models/products.interface';
import { ProductsService } from 'src/app/services/products.service';
import {
  loadProducts,
  loadedProducts,
} from 'src/app/state/actions/products.actions';
import { AppState } from 'src/app/state/app.state';
import {
  selectCartProducts,
  selectListProducts,
} from 'src/app/state/selectors/products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<any> = new Observable();
  cart$: Observable<any> = new Observable();
  cart: CartModel[] = [];
  products!: ProductsModel[];
  initialValues: CartModel[] = [];

  selectedValue = new FormControl('');
  start = true;

  constructor(
    private store: Store<AppState>,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());

    this.productsService.getProducts().subscribe((res: ProductsModel[]) => {
      this.store.dispatch(loadedProducts({ products: res }));
    });

    this.selectedValue.valueChanges.subscribe(() => {
      this.start = false;
      this.filterProducts(this.selectedValue.value!);
    });

    this.cart$ = this.store.select(selectCartProducts);
    this.cart$.subscribe((res: CartModel[]) => (this.cart = res));
  }

  get totalCartPrice() {
    let sum = 0;
    this.cart.map((item: CartModel) => {
      let amount = item.amount;
      let price = parseInt(item.item.price.replace(/\D/g, ''), 10);
      const result = amount * price;
      sum = sum + result;
    });

    return `$${sum.toLocaleString('es-CO', { maximumFractionDigits: 0 })}`;
  }

  filterProducts(category: string) {
    this.products$ = this.store.select(selectListProducts);
    this.products$.subscribe((res: ProductsModel[]) => {
      this.products = res.filter((item) => item.category === category);
    });

    this.initialValues = [];
    this.products[0].products.forEach((item) => {
      this.initialValues.push({
        category: category,
        amount: 0,
        item,
      });
    });
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}

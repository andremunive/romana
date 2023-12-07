import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartModel } from 'src/app/core/models/cart.interface';
import { AppState } from 'src/app/state/app.state';
import { selectCartProducts } from 'src/app/state/selectors/products.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart$: Observable<any> = new Observable();
  cart: CartModel[] = [];

  constructor(
    private store: Store<AppState>,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  goToCart() {
    this.location.back();
  }

  goToOrder() {
    this.router.navigate(['/order']);
  }
}

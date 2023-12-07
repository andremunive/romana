import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartModel } from 'src/app/core/models/cart.interface';
import {
  addToCart,
  removeFromCart,
} from 'src/app/state/actions/products.actions';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  cart: CartModel[] = [];
  @Input() initialValues: CartModel[] = [];
  @Input() isCart: boolean = false;
  constructor(private store: Store<AppState>) {}

  deleteProduct(product: CartModel) {
    let itemIndex = this.initialValues.findIndex(
      (item) => item.item.img == product.item.img
    );
    if (this.initialValues[itemIndex].amount > 0) {
      if (this.initialValues[itemIndex].amount - 1 == 0) {
        this.store.dispatch(
          removeFromCart({ productId: this.initialValues[itemIndex].item.img })
        );
      } else {
        let updatedProduct = {
          ...this.initialValues[itemIndex],
          amount: this.initialValues[itemIndex].amount - 1,
        };

        this.store.dispatch(addToCart({ product: updatedProduct }));
      }
      this.initialValues[itemIndex].amount -= 1;
    }
  }

  addProduct(product: CartModel) {
    let itemIndex = this.initialValues.findIndex(
      (item) => item.item.img == product.item.img
    );

    if (itemIndex !== -1 && this.initialValues[itemIndex].item.amount > 0) {
      let updatedProduct = {
        ...this.initialValues[itemIndex],
        amount: this.initialValues[itemIndex].amount + 1,
      };

      this.store.dispatch(addToCart({ product: updatedProduct }));
      this.initialValues[itemIndex].amount += 1;
    }
  }
}

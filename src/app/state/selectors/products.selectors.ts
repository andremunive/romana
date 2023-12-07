import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ProductsState } from 'src/app/core/models/products.state';
import { CartState } from 'src/app/core/models/cart.state';

export const selectProductsFeature = (state: AppState) => state.products;

export const selectCart = (state: AppState) => state.cart;

export const selectCartProducts = createSelector(
  selectCart,
  (state: CartState) => state.products
);

export const selectListProducts = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.products
);

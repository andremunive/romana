import { ActionReducerMap } from '@ngrx/store';
import { ProductsState } from '../core/models/products.state';
import { productsReducers } from './reducers/products.reducers';
import { CartState } from '../core/models/cart.state';
import { cartReducer } from './reducers/cart.reducers';

export interface AppState {
  products: ProductsState;
  cart: CartState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  products: productsReducers,
  cart: cartReducer,
};

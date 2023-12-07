import { createAction, props } from '@ngrx/store';
import { CartModel } from 'src/app/core/models/cart.interface';
import { ProductsModel } from 'src/app/core/models/products.interface';

export const loadProducts = createAction('[Products List] Load products');

export const loadedProducts = createAction(
  '[Products List] Loaded success',
  props<{ products: ProductsModel[] }>()
);

export const addToCart = createAction(
  '[Products List] Add To Cart',
  props<{ product: CartModel }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: string }>()
);

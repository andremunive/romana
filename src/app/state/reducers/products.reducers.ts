import { createReducer, on } from '@ngrx/store';
import { ProductsModel } from 'src/app/core/models/products.interface';
import { loadProducts, loadedProducts } from '../actions/products.actions';
import { ProductsState } from '../../core/models/products.state';

export const initialState: ProductsState = { loading: false, products: [] };

export const productsReducers = createReducer(
  initialState,
  on(loadProducts, (state) => {
    return { ...state, loading: true };
  }),
  on(loadedProducts, (state, { products }) => {
    return { ...state, loading: false, products };
  })
);

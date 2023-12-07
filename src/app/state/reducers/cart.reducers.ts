import { createReducer, on } from '@ngrx/store';
import { CartState } from '../../core/models/cart.state';
import { addToCart, removeFromCart } from '../actions/products.actions';

export const initialState: CartState = {
  products: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => {
    const productIndex = state.products.findIndex(
      (p) => p.item.img === product.item.img
    );
    let updatedProducts = [...state.products];

    if (productIndex !== -1) {
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        amount: product.amount,
      };
    } else {
      updatedProducts.push(product);
    }

    return {
      ...state,
      products: updatedProducts,
    };
  }),
  on(removeFromCart, (state, { productId }) => ({
    ...state,
    products: state.products.filter((p) => p.item.img !== productId),
  }))
);

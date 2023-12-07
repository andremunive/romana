import { ProductsModel } from './products.interface';

export interface ProductsState {
  loading: boolean;
  products: ReadonlyArray<ProductsModel>;
}

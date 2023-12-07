import { ProductsInfoModel } from './products.interface';

export interface CartModel {
  category: string;
  amount: number;
  item: ProductsInfoModel;
}

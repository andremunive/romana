export interface ProductsModel {
  category: string;
  products: ProductsInfoModel[];
}

export interface ProductsInfoModel {
  name: string;
  price: string;
  amount: number;
  img: string;
}

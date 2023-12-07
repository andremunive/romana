import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsModel } from '../core/models/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductsModel[]> {
    return this.http.get<ProductsModel[]>('/assets/build/db/products.json');
  }
}

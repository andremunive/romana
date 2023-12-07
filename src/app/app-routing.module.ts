import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./modules/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./modules/order/order.module').then((m) => m.OrderModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

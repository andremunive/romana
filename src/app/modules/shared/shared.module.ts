import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './components/product-item/product-item.component';

const components = [ProductItemComponent];

@NgModule({
  declarations: [...components, ProductItemComponent],
  exports: [...components],
  imports: [CommonModule],
})
export class SharedModule {}

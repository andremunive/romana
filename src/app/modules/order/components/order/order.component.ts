import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartModel } from 'src/app/core/models/cart.interface';
import { AppState } from 'src/app/state/app.state';
import { selectCartProducts } from 'src/app/state/selectors/products.selectors';

interface OrderModel {
  producto: string;
  categoria: string;
  cantidad: number;
  valorUnidad: string;
  subTotal: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  finalOrder: OrderModel[] = [];
  cart$: Observable<any> = new Observable();
  cart: CartModel[] = [];
  info: FormGroup = new FormGroup({});
  private phoneNumber: string = '573146977628';
  whatsappUrl: string = '';

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.checkCart();
  }

  initForm() {
    this.info = this.fb.group({
      nombreCompleto: ['', Validators.required],
      direccion: ['', Validators.required],
      barrio: ['', Validators.required],
      metodoPago: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  sendOrder() {
    this.calcOrder();
    const whatsappLink = `https://wa.me/${
      this.phoneNumber
    }?text=${this.buildMessage()}`;
    window.open(whatsappLink, '_blank');
  }

  calcOrder() {
    this.cart.forEach((item) => {
      this.finalOrder.push({
        producto: item.item.name,
        categoria: item.category,
        cantidad: item.amount,
        valorUnidad: item.item.price,
        subTotal: this.calcSubTotal(item.amount, item.item.price),
      });
    });
  }

  buildMessage() {
    const nombre = this.info.value.nombreCompleto;
    const direccion = this.info.value.direccion;
    const barrio = this.info.value.barrio;
    const telefono = this.info.value.telefono;
    const hi = `Hola *ROMANA*, mi nombre es ${nombre} y quiero realizar un pedido%0A%0A`;
    const deliveryInfo = `*Información de envio:*%0A*Dirección:* ${direccion}%0A*Barrio:* ${barrio}%0A*Telefono:* ${telefono}%0A%0A`;
    const orderInfo = `*Detalles del pedido:*${this.buildOrder()}`;
    return hi + deliveryInfo + orderInfo;
  }

  buildOrder() {
    const metodoPago = this.info.value.metodoPago;
    let pedido: string = '';
    const line = '-------------------------';
    this.finalOrder.forEach((item) => {
      pedido =
        pedido +
        `%0A${line}%0A*Item:* ${item.cantidad} ${item.producto} x ${item.categoria}%0A*Subtotal:* ${item.subTotal}`;
    });
    pedido =
      pedido +
      `%0A${line}%0A*Domicilio:* $5.000%0A${line}%0A*Metodo de pago:* ${metodoPago}%0A${line}%0A*TOTAL:* ${this.calcTotal(
        this.finalOrder
      )}`;
    return pedido;
  }

  calcSubTotal(amount: number, price: string) {
    let priceTransform = parseInt(price.replace(/\D/g, ''), 10);
    const result = amount * priceTransform;

    return `$${result.toLocaleString('es-CO', { maximumFractionDigits: 0 })}`;
  }

  calcTotal(finalOrder: OrderModel[]) {
    let sum = 5000;
    finalOrder.forEach((item) => {
      sum = sum + parseInt(item.subTotal.replace(/\D/g, ''), 10);
    });

    return `$${sum.toLocaleString('es-CO', { maximumFractionDigits: 0 })}`;
  }

  checkCart() {
    this.cart$ = this.store.select(selectCartProducts);
    this.cart$.subscribe((res: CartModel[]) => (this.cart = res));
    if (this.cart.length === 0) this.redirectToProducts();
  }

  redirectToProducts() {
    this.router.navigate(['']);
  }
}

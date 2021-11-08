import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { HeaderNavModule } from '../header-nav/header-nav.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    HeaderNavModule,
    SharedModule
  ]
})
export class OrderModule { }

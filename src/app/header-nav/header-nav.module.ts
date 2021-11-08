import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderNavRoutingModule } from './header-nav-routing.module';
import { HeaderNavComponent } from './header-nav.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HeaderNavComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeaderNavRoutingModule
  ],
  exports:[
    HeaderNavComponent
  ]
})
export class HeaderNavModule { }

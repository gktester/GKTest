import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorInterceptor, HttpTokenInterceptor } from 'src/app/core/interceptors';
import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,

  ],
  providers: [
   // { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class CoreModule { }

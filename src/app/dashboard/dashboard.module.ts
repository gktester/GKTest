import { HeaderNavModule } from './../header-nav/header-nav.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MatTreeModule } from '@angular/material/tree';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import { HierarchyComponent } from './hierarchy/hierarchy.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HierarchyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeaderNavModule,
    DashboardRoutingModule,
    MatTreeModule,
    MatButtonToggleModule,
    MatButtonModule
  ]
})
export class DashboardModule { }

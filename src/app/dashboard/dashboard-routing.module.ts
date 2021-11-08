import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HierarchyComponent } from './hierarchy/hierarchy.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
},
{path: 'hierarchy', component: HierarchyComponent},
{
  path:'customer',
  loadChildren:() => import('../customer/customer.module').then(m => m.CustomerModule)
},
{
  path:'order',
  loadChildren:() => import('../order/order.module').then(m => m.OrderModule)
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

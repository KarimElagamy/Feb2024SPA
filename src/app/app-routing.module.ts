import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './Public/product-list.component';
import { ProductDetailsComponent } from './Public/product-details.component';
import { OrdersComponent } from './Public/orders.component';

const routes: Routes = [
  { path: "", component: ProductListComponent },
  { path: "Details/:id", component: ProductDetailsComponent },
  { path: "Orders", component: OrdersComponent },
  { path: "Account", loadChildren: () => import('./Account/account.module').then(m => m.AccountModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

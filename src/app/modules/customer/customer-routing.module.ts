import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { AddComponent } from './components/add/add.component';
import { CarsComponent } from './components/cars/cars.component';
import { MyComponent } from './components/my/my.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CustomerGuard } from '../../auth/services/guard/customer-guard.guard';

const routes: Routes = [
  { path: 'dashboard', component: CustomerDashboardComponent, canActivate: [CustomerGuard] },
  { path: 'add', component: AddComponent, canActivate: [CustomerGuard] },
  { path: 'cars', component: CarsComponent, canActivate: [CustomerGuard] },
  { path: 'my', component: MyComponent, canActivate: [CustomerGuard] },
  { path: 'car/:id', component: CarDetailsComponent, canActivate: [CustomerGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

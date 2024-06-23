import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { AddComponent } from './components/add/add.component';
import { CarsComponent } from './components/cars/cars.component';
import { MyComponent } from './components/my/my.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';

const routes: Routes = [
  {path:'dashboard', component: CustomerDashboardComponent},
  {path:'add', component: AddComponent},
  {path:'cars', component: CarsComponent},
  {path:'my', component: MyComponent},
  {path:'car/:id', component: CarDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

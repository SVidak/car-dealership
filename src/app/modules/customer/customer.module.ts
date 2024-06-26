import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { AddComponent } from './components/add/add.component';
import { CarsComponent } from './components/cars/cars.component';
import { DemoNGZorroAntdModule } from '../../DemoNgZorroAntdModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarListComponent } from '../../car-list/car-list.component';
import { MyComponent } from './components/my/my.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    AddComponent,
    CarsComponent,
    CarListComponent,
    MyComponent,
    CarDetailsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DemoNGZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }

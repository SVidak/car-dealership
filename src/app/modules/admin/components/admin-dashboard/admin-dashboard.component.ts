import { Component, OnInit } from '@angular/core';
import { Car } from '../../../../model/car.model';
import { CarService } from '../../../../crud/car.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  public cars: Car[] = [];
  public mostExpensiveCar: Car;
  public averagePrice: number;
  public totalPrice: number;

  constructor(private service: CarService, private http: HttpClient) {}

  ngOnInit(): void {
    this.service.getCars().subscribe((cars) => {
      this.cars = cars;
      this.calculateCarStatistics();
    });
  }

  private calculateCarStatistics(): void {
    if (this.cars.length > 0) {
      this.mostExpensiveCar = this.cars.reduce((prev, curr) =>
        prev.price > curr.price ? prev : curr
      );
      this.totalPrice = this.cars.reduce((sum, car) => sum + car.price, 0);
      this.averagePrice = this.totalPrice / this.cars.length;
    }
  }
}

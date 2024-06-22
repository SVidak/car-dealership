import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../../crud/car.service';
import { Car } from '../../../../model/car.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrl: './my.component.scss',
})
export class MyComponent implements OnInit {
  cars: Car[] = [];

  constructor(
    private http: HttpClient,
    private carService: CarService,
    private sanitizer: DomSanitizer,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMyCars();
  }

  getMyCars(): void {
    this.carService.getCarsByUser().subscribe(
      (cars: Car[]) => {
        this.cars = cars;
        console.log(cars);
      },
      (error) => {
        console.error('Error fetching cars:', error);
      }
    );
  }

  updateCar(id: number): void {
    this.router.navigateByUrl("/update/:id");
  }
  

  deleteCar(id: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this car?',
      nzOnOk: () => {
        this.carService.deleteCar(id).subscribe(() => {
          this.cars = this.cars.filter((car) => car.id !== id);
          this.notification.success('Success', 'Car deleted');
        });
      }
    });
  }

  getSanitizedUrl(base64Image: string): SafeUrl {
    const objectURL = 'data:image/jpeg;base64,' + base64Image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}

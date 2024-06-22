import { Component, OnInit } from '@angular/core';
import { CarService } from '../crud/car.service';
import { Car } from '../model/car.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe({
      next: (data) => {
        this.cars = data;
        console.log('Cars loaded:', this.cars);
      },
      error: (err) => console.error('Error fetching cars', err),
    });
  }

  getSanitizedUrl(base64Image: string): SafeUrl {
    const objectURL = 'data:image/jpeg;base64,' + base64Image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}  
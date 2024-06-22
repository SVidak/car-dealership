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
  sortOption: string = '';

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

  sortCars() {
    if (this.sortOption === 'name') {
      this.cars.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOption === 'cheapest') {
      this.cars.sort((a, b) => a.price - b.price);
    }
      else if (this.sortOption === 'most expensive')
        this.cars.sort((a,b) => b.price - a.price);
      else if (this.sortOption === 'newest') 
        this.cars.sort((a,b) => b.year - a.year)
      else if (this.sortOption === 'oldest')
        this.cars.sort((a,b) => a.year - b.year)
  }

  getSanitizedUrl(base64Image: string): SafeUrl {
    const objectURL = 'data:image/jpeg;base64,' + base64Image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}  
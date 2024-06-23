import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Car } from '../../../../model/car.model';
import { CarService } from '../../../../crud/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss',
})
export class CarDetailsComponent implements OnInit {

  public car: Car;

  constructor(private sanitizer: DomSanitizer, private service: CarService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getCarById(id).subscribe(car => this.car = car);
  }

  getSanitizedUrl(base64Image: string): SafeUrl {
    const objectURL = 'data:image/jpeg;base64,' + base64Image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}

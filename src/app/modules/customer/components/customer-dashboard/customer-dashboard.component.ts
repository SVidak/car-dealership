import { Component } from '@angular/core';
import { CarService } from '../../../../crud/car.service';
import { Car } from '../../../../model/car.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {

  cars: Car[] = [];
  validateForm!: FormGroup;

  constructor(private carService: CarService, private fb: FormBuilder, private sanitizer: DomSanitizer) {}

  ngOnInit(){
    this.validateForm = this.fb.group({
      service: [null, [Validators.required]]
    })
  }

  searchCarByName(){
    this.carService.searchCarByName(this.validateForm.get('service').value).subscribe(res => {
      this.cars = res;
      console.log(res);
    })
  }
  getSanitizedUrl(base64Image: string): SafeUrl {
    const objectURL = 'data:image/jpeg;base64,' + base64Image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}

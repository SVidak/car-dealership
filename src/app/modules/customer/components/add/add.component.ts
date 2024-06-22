import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})

export class AddComponent implements OnInit {
  carForm: FormGroup;
  isSpinning: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.carForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      type: ['', Validators.required],
      transmission: ['', Validators.required],
      color: ['', Validators.required],
      year: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.carForm.patchValue({
      image: file
    });
    this.carForm.get('image').updateValueAndValidity();
  }

  addCar() {
    if (this.carForm.valid) {
      const userId = StorageService.getUserId(); 
      const token = StorageService.getToken(); 

      if (!userId) {
        console.error('User ID is missing');
        return;
      }

      const formData = new FormData();
      formData.append('name', this.carForm.get('name').value);
      formData.append('brand', this.carForm.get('brand').value);
      formData.append('type', this.carForm.get('type').value);
      formData.append('transmission', this.carForm.get('transmission').value);
      formData.append('color', this.carForm.get('color').value);
      formData.append('year', this.carForm.get('year').value);
      formData.append('description', this.carForm.get('description').value);
      formData.append('price', this.carForm.get('price').value);
      formData.append('image', this.carForm.get('image').value);
      formData.append('userId', userId);

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.isSpinning = true;
      this.http.post('http://localhost:8080/api/customer/car', formData, { headers })
        .subscribe({
          next: (response) => {
            this.isSpinning = false;
            this.notification.success(
              'Success',
              'Car added successfully!'
            );
            this.router.navigateByUrl("/customer/dashboard");
          },
          error: (error) => {
            this.isSpinning = false;
            alert("Error Occured! ");
          }
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
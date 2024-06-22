import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../model/car.model';
import { StorageService } from '../auth/services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/customer/cars';

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  getCarById(id: any): Observable<Car> {
    return this.http.get<Car>(`http://localhost:8080/api/customer/car/${id}`);
  }

  getCarsByUser(): Observable<Car[]> {
    const userId = StorageService.getUserId();
    console.log(userId);
    return this.http.get<Car[]>(
      `http://localhost:8080/api/customer/cars/${userId}`
    );
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/customer/car/${id}`);
  }

  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`http://localhost:8080/api/customer/car/${id}`, car);
  }
  
}

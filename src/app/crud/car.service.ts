import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../model/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/customer/cars';

  constructor(private http: HttpClient) {}

  
getCars(): Observable<Car[]> {
  return this.http.get<Car[]>(this.apiUrl);
}
}

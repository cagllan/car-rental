import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ElementResponseModel } from '../models/elementResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl = "https://localhost:44323/api/";
  
  constructor(private httpClient:HttpClient) { }

  getCarDetailById(id:number):Observable<ElementResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailbycarid?id=" + id;
    return this.httpClient.get<ElementResponseModel<Car>>(newPath);
  }
}

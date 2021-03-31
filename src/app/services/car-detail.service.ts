import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ClassResponseModel } from '../models/classResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl = "https://localhost:44323/api/";
  
  constructor(private httpClient:HttpClient) { }

  getCarDetailById(id:number):Observable<ClassResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcardetailbycarid?id=" + id;
    return this.httpClient.get<ClassResponseModel<CarDetail>>(newPath);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ClassResponseModel } from '../models/classResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  apiUrl = "https://localhost:44323/api/";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getalldetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }


  getCarById(carId:number):Observable<ClassResponseModel<Car>>{
    
    let newUrl = this.apiUrl + "cars/getbyid?id=" + carId;
    return this.httpClient.get<ClassResponseModel<Car>>(newUrl);
  }

  
  getCarsByBrand(id:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbybrandid?id=" + id;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(id:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbycolorid?id=" + id;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandIdAndColorId(filterBrandId:number,filterColorId:number):Observable<ListResponseModel<Car>>{
    let newPath= this.apiUrl + "cars/getcardetailsbybrandandcolorid?brandId="+filterBrandId+"&colorId="+filterColorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newUrl, car);
  }

  update(car:Car):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "cars/update";
    return this.httpClient.post<ResponseModel>(newUrl, car);
  }
}

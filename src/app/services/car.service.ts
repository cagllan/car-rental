import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/carDetail';
import { ClassResponseModel } from '../models/classResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Car } from '../models/car';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  apiUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getalldetails";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }


  getCarById(carId:number):Observable<ClassResponseModel<Car>>{
    
    let newUrl = this.apiUrl + "cars/getbyid?id=" + carId;
    return this.httpClient.get<ClassResponseModel<Car>>(newUrl);
  }

  
  getCarsByBrand(id:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcardetailsbybrandid?id=" + id;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(id:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcardetailsbycolorid?id=" + id;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrandIdAndColorId(filterBrandId:number,filterColorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath= this.apiUrl + "cars/getcardetailsbybrandandcolorid?brandId="+filterBrandId+"&colorId="+filterColorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  add(car:CarDetail):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newUrl, car);
  }

  update(car:CarDetail):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "cars/update";
    return this.httpClient.post<ResponseModel>(newUrl, car);
  }
}

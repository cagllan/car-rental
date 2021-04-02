import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { ClassResponseModel } from '../models/classResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newUrl = this.apiUrl + "brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newUrl);
  }

  getBrandById(brandId:number):Observable<ClassResponseModel<Brand>>{
    let newUrl = this.apiUrl + "brands/getbyid?id=" + brandId;
    return this.httpClient.get<ClassResponseModel<Brand>>(newUrl);
  }

  add(brand:Brand):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "brands/add";
    return this.httpClient.post<ResponseModel>(newUrl, brand);
  }

  update(brand:Brand):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "brands/update";
    return this.httpClient.post<ResponseModel>(newUrl, brand);
  }
}

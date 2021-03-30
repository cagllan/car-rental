import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44323/api/";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newUrl = this.apiUrl + "brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newUrl);
  }

  add(brand:Brand):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "brands/add";
    return this.httpClient.post<ResponseModel>(newUrl, brand);
  }
}

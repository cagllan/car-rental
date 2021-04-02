import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = environment.apiUrl;
  
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDto>>{
    let newUrl= this.apiUrl +"rentals/getalldetails";
    return this.httpClient.get<ListResponseModel<RentalDto>>(newUrl);
  }

  getRentalByCarId():Observable<ListResponseModel<RentalDto>>{
    return this.httpClient.get<ListResponseModel<RentalDto>>(this.apiUrl);
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "rentals/add";
    
    return this.httpClient.post<ResponseModel>(newUrl, rental);
    
  }


  
}

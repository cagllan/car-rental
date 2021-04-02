import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }


  addPayment(payment:Payment):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "payments/add";
    
    return this.httpClient.post<ResponseModel>(newUrl,payment);
  }

}

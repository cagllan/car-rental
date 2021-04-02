import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassResponseModel } from '../models/classResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;
  
  constructor(private httpClient:HttpClient) { }

  getByMail(email:string):Observable<ClassResponseModel<User>>{
    let newUrl = this.apiUrl + "users/getbymail";
    return this.httpClient.post<ClassResponseModel<User>>(newUrl, email);
  }
}

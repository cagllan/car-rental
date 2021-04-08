import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassResponseModel } from '../models/classResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';
import { UserDto } from '../models/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;
  
  constructor(private httpClient:HttpClient) { }

  getByMail(email:string):Observable<ClassResponseModel<User>>{
    let newUrl = this.apiUrl + "users/getbymail?email="+email;
    return this.httpClient.get<ClassResponseModel<User>>(newUrl);
  }


  getUserDetailByUserId(userId:number):Observable<ClassResponseModel<UserDto>>{
    let newUrl = this.apiUrl + "users/getuserdetailbyuserid?id="+userId;
    return this.httpClient.get<ClassResponseModel<UserDto>>(newUrl);
  }

  getUserByUserId(userId:number):Observable<ClassResponseModel<User>>{
    let newUrl = this.apiUrl + "users/getuserdetailbyuserid?id="+userId;
    return this.httpClient.get<ClassResponseModel<User>>(newUrl);
  }


  update(user:User):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "users/update";
    return this.httpClient.post<ResponseModel>(newUrl, user);
  }
}

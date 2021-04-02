import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassResponseModel } from '../models/classResponseModel';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

  

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel):Observable<ClassResponseModel<TokenModel>>{
    let newUrl = this.apiUrl + "auth/login";
    return this.httpClient.post<ClassResponseModel<TokenModel>>(newUrl, loginModel);
  }

  isAuthenticated(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  register(registerModel:RegisterModel):Observable<ClassResponseModel<TokenModel>>{
    let newUrl=this.apiUrl + "auth/register";
    return this.httpClient.post<ClassResponseModel<TokenModel>>(newUrl, registerModel);
  }


  }


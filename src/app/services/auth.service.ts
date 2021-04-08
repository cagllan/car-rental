import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassResponseModel } from '../models/classResponseModel';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenInfoModel } from '../models/tokenInfoModel';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

  tokenInfo:TokenInfoModel;

  

  

  constructor(
    private httpClient:HttpClient,
    private localStorage:LocalStorageService,
    private jwtHelper:JwtHelperService
    ) { }

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


  decodedToken():any{
    if(this.isAuthenticated()){
       const decodedToken =  this.jwtHelper.decodeToken(this.localStorage.get("token"));

       return this.tokenInfo = {
         userId : decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
         userName : decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
         userEmail:decodedToken["email"],
         userRoles:decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
       }

      
       
       
       
    }
  }


  }


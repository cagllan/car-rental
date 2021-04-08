import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})




export class ProfileGuard implements CanActivate {
user:User;
  constructor(
    private authService:AuthService, 
    private router:Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.authService.isAuthenticated()){

        let tokenId = this.authService.tokenInfo.userId;
        let userId = route.params['userId'];

        if(tokenId == userId){
          return true;
        }

        this.router.navigate(['cars']);
        return false;

      }else{
        this.router.navigate(['cars']);
        return false;
      }
    
  }
  
}

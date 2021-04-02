import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  isLogin:boolean;

  constructor(
    private authService:AuthService,
    private localStorage:LocalStorageService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.showPanel();
  }


  showPanel(){
    if(this.authService.isAuthenticated()){
      this.isLogin=true;
    }else{
      this.isLogin=false;
    }
  }

  logout(){
    
    this.localStorage.delete("token");
    
    
    location.replace("/")
  }

}

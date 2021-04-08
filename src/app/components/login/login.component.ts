import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import { TokenInfoModel } from 'src/app/models/tokenInfoModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  userTokenInfo:TokenInfoModel;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.isLogin();
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  login(){
    if(this.loginForm.valid){

      let loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message);
        localStorage.setItem("token", response.data.token);
        this.userTokenInfo = Object.assign({}, this.authService.decodedToken());

        console.log(this.userTokenInfo);

        location.replace("/");
        
        

        

        
        
      }, responseError=> {

        this.toastrService.error(responseError.error)
      });
    }
  }


  isLogin(){
    if(this.authService.isAuthenticated()){
      window.location.replace("/");
    }
  }

}

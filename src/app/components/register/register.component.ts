import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.isLogin();
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register(){
    if(this.registerForm.valid){

      let registerModel = Object.assign({}, this.registerForm.value);

      console.log(registerModel);
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.info(response.message);
        localStorage.setItem("token", response.data.token);
        location.replace("/")
        
      }, responseError=> {

        this.toastrService.error(responseError.error)
      });
    }
  }


  isLogin(){
    if(this.authService.isAuthenticated()){
      location.replace("/");
    }
  }

}

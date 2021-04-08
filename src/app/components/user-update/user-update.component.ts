import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  userUpdateForm:FormGroup;
  user:User;

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private userService:UserService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.createUserUpdateForm();

    this.activatedRoute.params.subscribe(params=>{
      if(params["userId"]){
        this.getUserById(params["userId"]);
        
      }
      
    });
  }

  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      userId : ['', Validators.required],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  getUserById(userId:number){
    this.userService.getUserByUserId(userId).subscribe(response=>{

      this.user = response.data;
      console.log("aaaaaaaaa");
      
      console.log(this.user);
      this.userUpdateForm = this.formBuilder.group({
        userId : new FormControl(this.user.userId, Validators.required),
        firstName : new FormControl(this.user.firstName ,Validators.required),
        lastName : new FormControl(this.user.lastName ,Validators.required),
        email: new FormControl(this.user.email ,Validators.required),
        password: new FormControl(this.user.password),
      });

    });
  }


  update(){
    
    if(this.userUpdateForm.valid){
      let userModel = Object.assign({}, this.userUpdateForm.value);

      if(userModel.password == null){
        console.log("password boş");
      }

      if(userModel.password != null){
        console.log(userModel);
      }

     
    }else{
      this.toastrService.error("Form eksik", "lütfen doldurun");
    }
  }



}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from 'src/app/models/userDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user:UserDto;

  constructor(private userService:UserService ,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["userId"]){
        
        this.getUser(params["userId"]);
        
      }
      
    });
  }

getUser(userId:number){
  this.userService.getUserDetailByUserId(userId).subscribe(response=>{
    this.user = response.data;

    console.log(response.data);
    
  });
}


}

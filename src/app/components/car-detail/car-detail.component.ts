import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  
  carDetail:Car;
  currentCarId:number;
  imageUrl = "https://localhost:44323";
  
  constructor(private cardetailService:CarDetailService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
     
    this.activatedRoute.params.subscribe(params => {  
       
      if(params["carId"]){
        this.getCarDetailByCarId(params["carId"]);   
        
      }
      
  });
}


  getCarDetailByCarId(carId:number){
    this.cardetailService.getCarDetailById(carId).subscribe(response=>{
      this.carDetail = response.data;
      
  });
  }



}

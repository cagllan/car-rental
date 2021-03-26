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
  imageUrl = "https://localhost:44323";
  startCarRentalDate:Date;
  endCarRentalDate:Date;
  totalDay:number;
  totalPrice:number;


  
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

  
setTotalDay(first:Date, second:Date) {
  let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  let firstDate:any = new Date(first);
  let secondDate:any = new Date(second);
  
  let diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    
  return this.totalDay = diffDays+1;
    
}

setTotalPrice(totalDay:number){
  
  this.totalPrice = totalDay * this.carDetail.dailyPrice;
}




}

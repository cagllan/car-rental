import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { RentalService } from 'src/app/services/rental.service';
import { SharingService } from 'src/app/services/sharing.service';


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  
  rental:Rental;
  rentalDetails:RentalDetail;
  carDetail:CarDetail;  
  imageUrl = "https://localhost:44323";
  startCarRentalDate:Date;
  endCarRentalDate:Date;
  totalDay:number;
  totalPrice:number;

  carStatus:boolean = true;

  carId:number;

  returnDateIsNull:boolean=false;


  
  constructor(
    private cardetailService:CarDetailService, 
    private activatedRoute:ActivatedRoute ,
    private sharingService:SharingService,
    private toastrService:ToastrService,
    private rentalService:RentalService
    ) { }
  

  ngOnInit(): void {
    

    this.activatedRoute.params.subscribe(params => {  
       
      if(params["carId"]){
        this.carId = params["carId"];
        this.chechCarReturnDateNull() 
        this.getCarDetailByCarId(params["carId"]);  

        
      }
      
  });
}


  getCarDetailByCarId(carId:number){
    this.cardetailService.getCarDetailById(carId).subscribe(response=>{
      this.carDetail = response.data;
      
  });
  }

  
  calculateTotalDay(){
    var start = new Date(this.endCarRentalDate);
    var end = new Date(this.startCarRentalDate);
    var totalSecond = Math.abs( Number(end) -Number(start) ) / 1000;
    var days_difference = Math.floor(totalSecond / (60 * 60 * 24));     
    this.totalDay = days_difference===0?1:days_difference;
    this.toastrService.success("Başlangıç tarihi eklendi", this.startCarRentalDate.toString());
    
  }


  calculateTotalPrice(){
    this.totalPrice = this.carDetail.dailyPrice;

      if(this.totalPrice===1){
        this.totalPrice = this.carDetail.dailyPrice;
      }else{
        this.totalPrice = this.totalDay * this.carDetail.dailyPrice;
      }
    }


  totalDateAndTotalPrice(){
    this.calculateTotalDay();
    this.calculateTotalPrice();
  }

  rentalDetail():RentalDetail{

    return this.rentalDetails={
      brandName:this.carDetail.brandName +" " + this.carDetail.name,
      carId:this.carDetail.carId,
      startDate:this.startCarRentalDate,
      endDate:this.endCarRentalDate,
      price:this.carDetail.dailyPrice,
      totalDay:this.totalDay,
      totalPrice:this.totalPrice
    }
    
  }


  rentAndSetRentInfo(){
    this.sharingService.setData(this.rentalDetail());
    

   this.rentalService.addRental({
    carId: this.carDetail.carId,
    customerId: 1,
    rentDate: this.startCarRentalDate,
    returnDate:null
    
   }).subscribe(response=>{
     console.log(response.message);
     console.log(response.success)
   });
}



chechCarReturnDateNull(){
  this.rentalService.getRentals().subscribe(response=>{
    
    let lastCar = response.data.filter(data => data.carId == this.carId).pop();
    if(lastCar.returnDate === null){
      this.returnDateIsNull =true;
    }
    
  });
}




  }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[];
  searchText:string;
  
  constructor(
    private carService:CarService, 
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {      
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }else if(params["filterBrandId"] || params["filterColorId"]){

        if(params["filterBrandId"] == 0 && params["filterColorId"] == 0 ){
          this.getCars();
        } else if ( params["filterColorId"] == 0) {
          this.getCarsByBrand(params["filterBrandId"]);
        } else if (params["filterBrandId"] == 0){
          this.getCarsByColor(params["filterColorId"]);
        } else {
          this.getCarsByBrandIdAndColorId(params["filterBrandId"],params["filterColorId"]);
        }

      }else {
        this.getCars();
      }        
     
      
    });

    
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data;
    });
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data;
    });
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data;
    });
  }

  getCarsByBrandIdAndColorId(filterBrandId:number,filterColorId:number){
    this.carService.getCarsByBrandIdAndColorId(filterBrandId,filterColorId).subscribe(response=>{
      this.cars = response.data;
    });
  }

}

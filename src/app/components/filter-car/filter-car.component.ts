import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-filter-car',
  templateUrl: './filter-car.component.html',
  styleUrls: ['./filter-car.component.css']
})
export class FilterCarComponent implements OnInit {

  brands:Brand[];
  colors:Color[];
  brandSelectId:number;
  colorSelectId:number;

  constructor(
    private brandService:BrandService,
    private colorService:ColorService
    ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.selectBrandDefault();
    this.selectColorDefault();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }

  selectBrandDefault(){
      this.brandSelectId = 0;
  }

  selectColorDefault(){    
      this.colorSelectId = 0;
  }
  
  selectedBrandOption(brandId:number){
    if(this.brandSelectId == brandId){
      return true;
    }else{
      return false;
    }
  }

  selectedColorOption(colorId:number){
    if(this.colorSelectId == colorId){
      return true;
    }else{
      return false;
    }
  }

}

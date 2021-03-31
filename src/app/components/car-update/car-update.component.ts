import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder,Validators, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { Car } from 'src/app/models/car';


@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup;
  car:Car;
  brands:Brand[];
  colors:Color[];

  constructor(
    private carService:CarService, 
    private formBuilder:FormBuilder, 
    private toastrService:ToastrService,
    private brandService:BrandService,
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createCarUpdateForm();
    this.getBrands();
    this.getColors();

    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarById(params["carId"]);
      }
    });
  }


  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      id : ['', Validators.required],
      brandId: ['',Validators.required],
      colorId: ['',Validators.required],
      modelYear:[, Validators.required],
      dailyPrice:[, Validators.required],
      description:['', Validators.required]
     });
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


  getCarById(carId:number){
    this.carService.getCarById(carId).subscribe(response=>{
      this.car = response.data;  

      console.log(this.car);

      this.carUpdateForm = this.formBuilder.group({
        id : new FormControl(this.car.id),
        brandId: new FormControl(this.car.brandId),
        colorId: new FormControl(this.car.colorId),
        modelYear: new FormControl(this.car.modelYear),
        dailyPrice: new FormControl(this.car.dailyPrice),
        description: new FormControl(this.car.description)
     
      });

      console.log(this.carUpdateForm);
    });
  }




  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({}, this.carUpdateForm.value);

      this.carService.update(carModel).subscribe(response=>{        
        this.toastrService.success(response.message,"Başarılı");
      }, 
      responseError=> {        
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası");            
          }          
        }              
      });
    }else{
      this.toastrService.error("Form eksik", "lütfen doldurun");
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand:Brand;
  brandUpdateForm:FormGroup;
  

  constructor(
    private formBuilder:FormBuilder, 
    private brandService:BrandService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {    
    this.createBrandUpdateForm();
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getBrandById(params["brandId"]);
      }
    });
  }


  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      id : ["", Validators.required],
      name : ["", [Validators.required, Validators.minLength(2)]]
    });
  }


  getBrandById(brandId:number){
    this.brandService.getBrandById(brandId).subscribe(response=>{
      this.brand = response.data;  
      this.brandUpdateForm = this.formBuilder.group({
        id : new FormControl(this.brand.id),
        name : new FormControl(this.brand.name)        
      });

    });
  }



  update(){
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({}, this.brandUpdateForm.value);

      this.brandService.update(brandModel).subscribe(response=>{        
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

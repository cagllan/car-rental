import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  
  colorUpdateForm:FormGroup;
  color:Color;

  constructor(
    private formBuilder:FormBuilder, 
    private colorService:ColorService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createColorUpdateForm();
    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"]){
        this.getColorById(params["colorId"]);
        
      }
      
    });
    
  }


  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      id : ["", Validators.required],
      name : ["", [Validators.required, Validators.minLength(2)]]
    });
  }


  getColorById(colorId:number){
    this.colorService.getColorById(colorId).subscribe(response=>{

      this.color = response.data;  
      this.colorUpdateForm = this.formBuilder.group({
        id : new FormControl(this.color.id, Validators.required),
        name : new FormControl(this.color.name ,Validators.required)        
      });

    });
  }

  update(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({}, this.colorUpdateForm.value);

      this.colorService.update(colorModel).subscribe(response=>{        
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

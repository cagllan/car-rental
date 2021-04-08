import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { PaymentService } from 'src/app/services/payment.service';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-rental-car',
  templateUrl: './rental-car.component.html',
  styleUrls: ['./rental-car.component.css']
})
export class RentalCarComponent implements OnInit {

  data:RentalDetail;
  paymentForm:FormGroup;

  constructor(
    private sharingService:SharingService,
    private paymentService:PaymentService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder    
    ) { }

  ngOnInit(): void {
    this.data = this.sharingService.getData();
    this.createPaymentForm();
  }

  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      fullName:["", Validators.required],
      cardNumber: ["", Validators.required],
      year: ["", Validators.required],
      month: ["", Validators.required],
      ccv: ["", Validators.required]
    });
  }

  addPayment(){
    if(this.paymentForm.valid){
      let paymentModel = Object.assign({}, this.paymentForm.value);

      this.paymentService.addPayment(paymentModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
        
      }, responseError=> {
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası");            
          }
          
        }
      });

    }else{
      this.toastrService.error("form eksik","lütfen formu doldurun");
    }

    
  }


}

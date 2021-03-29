import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import { Payment } from 'src/app/models/payment';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { PaymentService } from 'src/app/services/payment.service';
import { SharingServiceService } from 'src/app/services/sharing-service.service';

@Component({
  selector: 'app-rental-car',
  templateUrl: './rental-car.component.html',
  styleUrls: ['./rental-car.component.css']
})
export class RentalCarComponent implements OnInit {

  data:RentalDetail;
  

  constructor(
    private sharingService:SharingServiceService,
    private paymentService:PaymentService,
    private toastrService:ToastrService
    
    ) { }

  ngOnInit(): void {
    this.data = this.sharingService.getData();
  }


  addPayment(){
    
    let payment:Payment = {
      cardNumber:"342234567123",
      ccv : "456",
      fullName : "Musteri Adi",
      month : "05",
      year : "2023"

    }

    this.paymentService.addPayment(payment).subscribe(response=>{
      this.toastrService.success(response.message);
      
    });
  }


}

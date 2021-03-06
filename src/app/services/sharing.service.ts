import { Injectable } from '@angular/core';
import { RentalDetail } from '../models/rentalDetail';


@Injectable({
  providedIn: 'root'
})
export class SharingService {
  private data:RentalDetail;
  constructor() { }

  setData(data:RentalDetail){
    this.data=data;
  }

  getData():RentalDetail{
    return this.data;
}

}

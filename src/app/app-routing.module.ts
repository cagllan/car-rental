import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalCarComponent } from './components/rental-car/rental-car.component';
import { RentalComponent } from './components/rental/rental.component';


const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"rentals",component:RentalComponent},
  {path:"customers",component:CustomerComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"car/:carId",component:CarDetailComponent},
  {path:"cars/filter/:filterBrandId/:filterColorId", component:CarComponent},
  {path:"carrental/payment", component:RentalCarComponent},
  {path:"brands/add", component:BrandAddComponent},
  {path:"brands/update/:brandId", component:BrandUpdateComponent},
  {path:"colors/add", component:ColorAddComponent},
  {path:"colors/update/:colorId", component:ColorUpdateComponent},
  {path:"cars/add", component:CarAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

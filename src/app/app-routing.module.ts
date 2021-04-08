import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalCarComponent } from './components/rental-car/rental-car.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ProfileGuard } from './guards/profile.guard';



const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"rentals",component:RentalComponent, canActivate:[LoginGuard]},
  {path:"customers",component:CustomerComponent, canActivate:[LoginGuard]},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"car/:carId",component:CarDetailComponent},
  {path:"cars/filter/:filterBrandId/:filterColorId", component:CarComponent},
  {path:"carrental/payment", component:RentalCarComponent},
  {path:"brands/add", component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"brands/update/:brandId", component:BrandUpdateComponent, canActivate:[LoginGuard]},
  {path:"colors/add", component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"colors/update/:colorId", component:ColorUpdateComponent, canActivate:[LoginGuard]},
  {path:"cars/add", component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/update/:carId", component:CarUpdateComponent, canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"user/profile/:userId", component:UserInfoComponent, canActivate:[ProfileGuard]},
  {path:"user/update/:userId", component:UserUpdateComponent, canActivate:[ProfileGuard]},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { CarImage } from "./carImage";

export interface Car{
    carId:number;
    name:string;
    brandName:string;
    colorName:string;
    dailyPrice:number;
    carImages:CarImage[];
}
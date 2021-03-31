import { CarImage } from "./carImage";

export interface CarDetail{
    carId:number;
    name:string
    brandName:string;
    colorName:string;
    dailyPrice:number;
    carImages:CarImage[];
    brandId:number;
    colorId:number;
    modelYear:number;
    description:string;
}
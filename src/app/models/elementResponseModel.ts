import { ResponseModel } from "./responseModel";

export interface ElementResponseModel<T> extends ResponseModel{
    data:T;
}
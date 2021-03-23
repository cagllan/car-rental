import { ResponseModel } from "./responseModel";

export interface ClassResponseModel<T> extends ResponseModel{
    data:T;
}
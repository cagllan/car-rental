import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get(key:string){
    localStorage.getItem(key);
  }

  set(key:string,value:string){
    localStorage.setItem(key,value);
  }

  delete(key:string){
    localStorage.removeItem(key);
  }
}

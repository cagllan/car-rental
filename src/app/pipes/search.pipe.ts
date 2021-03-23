import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Car[], searchText: string): Car[] {
    searchText = searchText?searchText.toLocaleLowerCase():"";
    return searchText?value.filter((c:Car)=>
    c.brandName.toLocaleLowerCase().indexOf(searchText) !== -1 || 
    c.colorName.toLocaleLowerCase().indexOf(searchText) !== -1 || 
    c.name.toLocaleLowerCase().indexOf(searchText) !== -1):value;
  }

}

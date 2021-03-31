import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: CarDetail[], searchText: string): CarDetail[] {
    searchText = searchText?searchText.toLocaleLowerCase():"";
    return searchText?value.filter((c:CarDetail)=>
    c.brandName.toLocaleLowerCase().indexOf(searchText) !== -1 || 
    c.colorName.toLocaleLowerCase().indexOf(searchText) !== -1 || 
    c.name.toLocaleLowerCase().indexOf(searchText) !== -1):value;
  }

}

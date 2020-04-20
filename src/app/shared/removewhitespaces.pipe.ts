import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removewhitespaces'
})
export class RemovewhitespacesPipe implements PipeTransform {

  // transform(value: string, args?: any): string {
  //   return value.replace(/ /g, '-');
  // }

  transform(value: string): string {
    return value? value.replace(/ /g, "-") : value;
  }

}

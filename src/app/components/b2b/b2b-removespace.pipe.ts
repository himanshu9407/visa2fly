import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'b2bRemovespace'
})
export class B2bRemovespacePipe implements PipeTransform {

  transform(value: string): string {
    return value? value.replace(/ /g, "") : value;
  }
}

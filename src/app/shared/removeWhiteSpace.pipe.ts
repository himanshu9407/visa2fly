import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'removewhitespace'
})
export class RemovewhitespacePipe implements PipeTransform {
 
  transform(value: string, args?: any): string {
    return value.replace(/\s/g, '');
  }
 
}
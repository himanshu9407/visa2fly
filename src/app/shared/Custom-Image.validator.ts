import { FormControl } from '@angular/forms';

export function requiredFileType( type: string ) {
    return function (control: FormControl) {
      const file = control.value;
    //   console.log(file);
      if ( file ) {
        const extension = file.name.split('.')[1].toLowerCase();
        if ( 'pdf' !== extension.toLowerCase() && 'png' !== extension.toLowerCase() && 
        'jpg' !== extension.toLowerCase() &&'jpeg' !== extension.toLowerCase() && file.size > 1024000 ) {
            // control.setErrors({type:true});
          return {
            type: true,
            size : true
          };
        }

        else if ('pdf'!== extension.toLowerCase() && 'png' !== extension.toLowerCase() && 
        'jpg' !== extension.toLowerCase() &&'jpeg' !== extension.toLowerCase()) {
            return {
                type : true
            }
        }
        else if (file.size > 1024000){
            return {
                size: true
            }
        }

        else
        // else {

        //     control.setErrors(null);
        // }
        return null;
      }

      return null;
    };
  }
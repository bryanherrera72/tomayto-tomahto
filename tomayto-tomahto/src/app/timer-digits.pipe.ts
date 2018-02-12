import { Pipe, PipeTransform } from '@angular/core';

/*
  Adjusts timer to add leading zeros 
*/
@Pipe({
  name: 'timerDigits'
})
export class TimerDigitsPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    
    if(value != null){
      if(+value < 10){
        value = "0" + value;
      }
    }
    return value;
  }

}

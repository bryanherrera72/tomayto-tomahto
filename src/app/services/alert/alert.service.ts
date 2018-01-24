import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AlertService {
  //event fires when work interval is done. 
  workComplete: EventEmitter<{message: string}> = new EventEmitter();

  restComplete: EventEmitter<{message:string}> = new EventEmitter();
  constructor() { }

  workIntervalComplete(){
    this.workComplete.emit({message: "You've completed a work interval. Now take a break!"});
  }

  restIntervalComplete(){
    this.restComplete.emit({message: "You've completed a rest interval. Now get back to work!"});
  }
}

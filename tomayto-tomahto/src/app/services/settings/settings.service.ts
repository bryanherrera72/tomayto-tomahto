import { Injectable } from '@angular/core';
import { Timer } from '../../models/Timer';

@Injectable()
export class SettingsService {
  workInterval: boolean = true;
  // start with the default timer
  timer:Timer = {
    minutes: 25,
    seconds: 0,
    rest_minutes: 5,
    rest_seconds: 0
  };

  constructor() { }
  
  getTimerProperties(){
    return this.timer;
  }
  setIsWorkInterval(value: boolean){
    this.workInterval = value;
  }
  isWorkInterval(){
    return this.workInterval;
  }
}

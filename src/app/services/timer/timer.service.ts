import { Injectable, EventEmitter } from '@angular/core';
import { Timer } from '../../models/Timer';
import { SettingsService } from '../settings/settings.service';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TimerService {
  
  timer:Timer;

  timerSubj: Subject<Timer> =new Subject<Timer>();
  isWorkInterval:boolean;
  settingsUpdateSubj: Subject<Timer> = new Subject<Timer>();

  intervalTypeChange: EventEmitter<boolean> = new EventEmitter<boolean>();  
  
  constructor(private settingsService:SettingsService) { 
    this.isWorkInterval = true;
  }
  ngOnInit(){
  }
  
  initSubject(){
    this.timerSubj= Observable.create(
      (observer:Observer<Timer>) => {
       let tickerId = setInterval(
         ()=>{
           if(this.isWorkInterval){
            this.decrementIntervalTimer();
            observer.next(this.timer);
           }
           else{
             this.decrementRestTimer();
             observer.next(this.timer);
           }
       },1000);
 
       return () => {
         clearInterval(tickerId);
       }
      }
     );

     this.settingsService.settingsSubject.subscribe(
       (data: Timer)=>{
         this.setTimer(data)
         this.settingsUpdateSubj.next(data);
       }
     );
   
  }
  
  setTimer(timer:Timer){
    this.timer = timer;
  }

  getTimer(){
    return this.timer;
  }

  
  getTimerObs():Observable<Timer>{
    return this.timerSubj;
  }

  /*
    decrementIntervalTimer(): Decrement timer tracking the interval time.
  */
  decrementIntervalTimer(){
    if(this.timer.seconds == 0 && this.timer.minutes ==0){
      this.setWorkInterval(false);
      this.setTimer(this.settingsService.getTimerProperties());
      this.intervalTypeChange.emit(this.isWorkInterval);
    }
    else if(this.timer.seconds == 0){
      this.timer.seconds = 60;
      this.timer.minutes --;
    }
    this.timer.seconds --;
  }
  /*
    decrementRestTimer(): Decrement timer tracking the rest time
  */
  decrementRestTimer(){
    if(this.timer.rest_seconds == 0 && this.timer.rest_minutes ==0){
      this.setWorkInterval(true);
      this.setTimer(this.settingsService.getTimerProperties());
      this.intervalTypeChange.emit(this.isWorkInterval);
    }
    else if(this.timer.rest_seconds == 0){
      this.timer.rest_seconds = 60;
      this.timer.rest_minutes --;
    }
    
    this.timer.rest_seconds --;
  }
  
  /*
    setWorkInterval
    @param: value  true = "work interval" false = "rest interval"
  */
  setWorkInterval(value: boolean){
    this.isWorkInterval = value;
  }
  
  
}

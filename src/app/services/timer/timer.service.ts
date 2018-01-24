import { Injectable, EventEmitter } from '@angular/core';
import { Timer } from '../../models/Timer';
import { SettingsService } from '../settings/settings.service';
import { AlertService } from '../alert/alert.service';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

export class TimerService {
  
  timer:Timer;

  timerSubj: Subject<Timer> =new Subject<Timer>();
  
  isWorkInterval: boolean = true;

  intervalTypeChange: EventEmitter<boolean> = new EventEmitter<boolean>();  
  constructor() { 
    
  }
  ngOnInit(){
    this.initSubject();
    this.intervalTypeChange.emit(this.isWorkInterval);
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
      this.isWorkInterval = false;
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
      this.isWorkInterval = true;
      this.intervalTypeChange.emit(this.isWorkInterval);
    }
    else if(this.timer.rest_seconds == 0){
      this.timer.rest_seconds = 60;
      this.timer.rest_minutes --;
    }
    
    this.timer.rest_seconds --;
  }
  
  setIsWorkInterval(value: boolean){
    this.isWorkInterval = value;
  }
  
  
}

import { Injectable, EventEmitter } from '@angular/core';
import { Timer } from '../../models/Timer';
import { SettingsService } from '../settings/settings.service';
import { AlertService } from '../alert/alert.service';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/Rx';

@Injectable()
export class TimerService {
  
  timer:Timer;

  timerObs: Observable<Timer>;
  
  constructor() { 

  }
  ngOnInit(){
    
  }
  
  setTimer(timer:Timer){
    this.timer = timer;
  }

  getTimer(){
    return this.timer;
  }
  /*
    startTimer(): Initialize rest or standard timer to start state.
  */
  startTimer(): Observable<Timer>{
    this.timerObs = Observable.create(
     (observer:Observer<Timer>) => {
      let tickerId = setInterval(
        ()=>{
          this.decrementIntervalTimer();
          observer.next(this.timer);
      },1000);

      return () => {
        clearInterval(tickerId);
      }
     }
    );
    return this.timerObs;
  }

  /*
    resumeTimer(): continue rest or standard timer
  */
  resumeTimer(): Observable<Timer>{
    this.timerObs = Observable.create(
      (observer:Observer<Timer>)=>{
        let tickerId = setInterval(
          ()=>{
            this.decrementIntervalTimer();
            observer.next(this.timer);
        },1000);

        return () => {
          clearInterval(tickerId);
        } 
      }
     );
      
    return this.timerObs;
  }
  
  pauseTimer(){
    
  }

  resetTimer(){
   
  }

  /*
    decrementIntervalTimer(): Decrement timer tracking the interval time.
  */
  decrementIntervalTimer(){
    
    if(this.timer.seconds == 0 && this.timer.minutes ==0){
      //timer has completed.
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

  }
  

  
  /*
  MIGHT STILL USE THIS///////////////////////////////////////////////////
    Sets the timer up to display properly
  */
  // private updateDisplayTimer(timer: Timer){
  //   if(timer.minutes < 10)
  //     this.displayTimer.minutes = "0" +timer.minutes;
  //   else
  //     this.displayTimer.minutes = timer.minutes.toString();
  //   if(timer.seconds < 10)
  //     this.displayTimer.seconds = "0" + timer.seconds;
  //   else
  //     this.displayTimer.seconds = timer.seconds.toString();
  // }
  
}

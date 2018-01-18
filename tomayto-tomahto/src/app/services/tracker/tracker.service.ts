import { Injectable } from '@angular/core';
import { IntervalService } from '../interval/interval.service';
import { TimerService } from '../timer/timer.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AlertService } from '../alert/alert.service';
import { SettingsService } from '../settings/settings.service';
import { Timer } from '../../models/Timer';
import {Observable} from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class TrackerService implements OnInit {
  timer:Observable<Timer>;
  displayTimer: Timer;
  timerSub: Subscription;

  
  constructor(private timerService: TimerService,
              private settingsService: SettingsService){
    
                
  }

  ngOnInit(){
   this.timerService.setTimer(this.settingsService.getTimerProperties());
   this.displayTimer = this.settingsService.getTimerProperties();
  }

  getDisplayTimer(){
    return this.timerService.getTimer();
  }
  /*
    startTimer(): initializes and starts the timer
  */
  startTimer(){
    this.timerService.setTimer(this.settingsService.getTimerProperties());
    this.timer = this.timerService.startTimer();
    this.timerSub = this.timer.subscribe(
      (data:Timer)=>{
        this.displayTimer = data;
        console.log(this.displayTimer);
      }
    );
  }

  /*
    resumeTimer(): Continues the timer from where it left off.
  */
  resumeTimer(){
    this.timer = this.timerService.resumeTimer();
    this.timerSub = this.timer.subscribe(
      (data:Timer)=>{
        this.displayTimer = data;
        console.log(this.displayTimer);
      }
    );
  }

  /*
    Pause the timer in place.
  */
  pauseTimer(){
    if(!(this.timerSub==null) && !this.timerSub.closed)
      this.timerSub.unsubscribe();
    this.timerService.pauseTimer();
  }

  resetTimer(){
    this.timerService.resetTimer();
  }

  
  
}
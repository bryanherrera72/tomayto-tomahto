import { Injectable } from '@angular/core';
import { IntervalService } from '../interval/interval.service';
import { TimerService } from '../timer/timer.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AlertService } from '../alert/alert.service';
import { SettingsService } from '../settings/settings.service';
import { Timer } from '../../models/Timer';
import {Observable} from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TrackerService implements OnInit {
  timer:Observable<Timer>;
  displayTimer: Timer;
  timerSubcription: Subscription;

  isWorkInterval: boolean = true; 

  workIntSubj: Subject<boolean> = new Subject<boolean>();
  timerSubject: Subject<Timer> = new Subject<Timer>();
  
  constructor(private timerService: TimerService,
              private settingsService: SettingsService){
    
                
  }

  ngOnInit(){
   this.timerService.setTimer(this.settingsService.getTimerProperties());
   this.timerService.setIsWorkInterval(this.settingsService.isWorkInterval());
   this.displayTimer = this.settingsService.getTimerProperties();
   this.timerSubject =  new Subject<Timer>();
   this.timerService.intervalTypeChange.subscribe(
     (type: boolean)=>{
      /*
        Here we can find out if the timer is going from rest->work or work->rest
        */

       this.isWorkInterval = type;
     }
   );
  }

  getDisplayTimer(){
    return this.timerService.getTimer();
  }
  
  /*
    startTimer(): initializes and starts the timer
  */
  startTimer(){
    this.timerService.setTimer(this.settingsService.getTimerProperties());
    this.timer = this.timerService.getTimerObs()
    this.timerSubcription = this.timer.subscribe(
      (data:Timer)=>{
        this.displayTimer = data;
        this.timerSubject.next(this.displayTimer);
        console.log(this.displayTimer);
      }
    );
  }

  /*
    resumeTimer(): Continues the timer from where it left off.
  */
  resumeTimer(){
    this.timer = this.timerService.getTimerObs();
    this.timerSubcription = this.timer.subscribe(
      (data:Timer)=>{
        this.displayTimer = data;
        this.timerSubject.next(this.displayTimer);
        console.log(this.displayTimer);
      }
    );
  }

  getTimerSubject(){
    return this.timerSubject;
  }

  /*
    Pause the timer in place.
  */
  pauseTimer(){
    if(!(this.timerSubcription==null) && !this.timerSubcription.closed)
      this.timerSubcription.unsubscribe();
    
  }

  resetTimer(){
    this.timerService.setTimer(this.settingsService.getTimerProperties());
  }

  
  
}
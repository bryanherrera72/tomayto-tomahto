import { Injectable } from '@angular/core';
import { Timer } from '../../models/Timer';
import { Subject } from 'rxjs/Subject';
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class SettingsService implements OnInit{
  workInterval: boolean = true;
  settingsSubject: Subject<Timer> = new Subject<Timer>();
  // start with the default timer this shouldnt be changed unless user changes it.
  timer:Timer = {
    minutes: 25,
    seconds: 0,
    rest_minutes: 5,
    rest_seconds: 0
  };

  constructor() { }
  
  ngOnInit(){
   this.settingsSubject = new Subject<Timer>();
  }

  //return a copy of the timer settings 
  getTimerProperties(){
    return new Timer(this.timer.minutes, 
                    this.timer.seconds, 
                    this.timer.rest_minutes, 
                    this.timer.rest_seconds);
  }
  setIsWorkInterval(value: boolean){
    this.workInterval = value;
  }
  isWorkInterval(){
    return this.workInterval;
  }

  setWorkIntervalTime(minutes: number){
    this.timer.minutes = minutes;
    this.timer.seconds = 0;
    this.timer.rest_seconds = 0;
    this.settingsSubject.next(this.timer);
  }
  setRestIntervalTime(minutes: number){
    this.timer.rest_minutes = minutes;
  }
}

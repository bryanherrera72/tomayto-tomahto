import { Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { TimerService } from '../services/timer/timer.service';
import { Timer } from '../models/Timer';
import { IntervalService } from '../services/interval/interval.service';
import { TrackerService } from '../services/tracker/tracker.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';


/*
Component keeps track of time per interval and number of intervals
*/
@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit{
  // boolean states whether the button has been clicked once
  hasBeenClicked: boolean = false;
  displayTimer:Timer = new Timer(25,0,5,0);
  //boolean states when the timer is running.
  isTiming:boolean = true;
  button_text: string = 'Start';

  isWorkInterval:boolean = true;
  
  constructor(private timerService: TimerService,
              private trackerService: TrackerService) { 

              }

  ngOnInit() {
    this.timerService.initSubject();
    this.trackerService.getTimerSubject().subscribe(
      (timer: Timer) => {
        this.displayTimer = timer;
      }
    );
    this.timerService.intervalTypeChange.subscribe(
      (type:boolean)=>{
        console.log(type);
        this.isWorkInterval = type;
      }
    );
  }
  
  startButtonState(){
   let button_classes = {
      'btn': true,
      'btn-success': this.isTiming,
      'btn-danger' : !this.isTiming,
    }
    return button_classes;
  }

  //change color and text of button depending on whether we are timing.
  toggleButtonState(){
    this.button_text = (!this.isTiming) ? 'Start':'Stop';
    this.isTiming = !this.isTiming;
    if(!this.isTiming && !this.hasBeenClicked){
      console.log("timer started");
      this.hasBeenClicked = true;
      this.startTimer();
    }
    else if(this.isTiming){
      this.pauseTimer();
      console.log("timer paused");
    }
    else if(!this.isTiming && this.hasBeenClicked){
      this.resumeTimer();
      console.log("timer resumed");
    }
  }

  private startTimer(){
    this.trackerService.startTimer();
  }
  private resumeTimer(){
    this.trackerService.resumeTimer();
  }
  private pauseTimer(){
    this.trackerService.pauseTimer();
  }
  private resetTimer(){
    this.trackerService.resumeTimer();
  }


 

}

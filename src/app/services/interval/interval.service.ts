import { Injectable, OnInit, EventEmitter} from '@angular/core';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class IntervalService implements OnInit{
  private intervalsCompleted= 0;
  private intervalGoal= 4;
  
  intervalCompleted:EventEmitter<{intervals: number}> = new EventEmitter();
  
  constructor(private settingsService: SettingsService) {

  }

  ngOnInit(){
    
  }
  
  intervalComplete(){
    this.intervalsCompleted++;
    this.intervalCompleted.emit({intervals: this.intervalsCompleted});
  }
  
  getIntervalsCompleted(){
    return this.intervalsCompleted;
  }
  getIntervalGoal(){
    return this.intervalGoal;
  }
}

import { Injectable, EventEmitter, OnInit } from '@angular/core';
import {Howl, Howler} from 'howler';

@Injectable()
export class AlertService implements OnInit{
  private ALERT ='../../../assets/sounds/alert-chime.wav';
  sound: Howl;
  //event fires when work interval is done. 
  workComplete: EventEmitter<{message: string}> = new EventEmitter();

  restComplete: EventEmitter<{message:string}> = new EventEmitter();
  constructor() {
    this.sound = new Howl({
      src: [this.ALERT],
    });
  }

  ngOnInit(){
  }
  workIntervalComplete(){
    this.sound.play();
    this.workComplete.emit({message: "You've completed a work interval. Now take a break!"});
  }

  restIntervalComplete(){
    this.sound.play();
    this.restComplete.emit({message: "You've completed a rest interval. Now get back to work!"});
  }
}

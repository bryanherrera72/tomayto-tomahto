import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { SettingsService } from '../services/settings/settings.service';
import { Subject } from 'rxjs/Subject';
import { Timer } from '../models/Timer';

/*
  Component for managing application settings like: 
  -how many intervals per break (up to 8)
  -time period per interval
  -volume (for alert)
  
*/
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;


  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.settingsForm = new FormGroup({
      "workMinutes": new FormControl(25),
      "restMinutes": new FormControl(5),
      "muteSound": new FormControl(false),
    });
  }

  onSubmit(){
    //check vals. send to tracker component.
    
    this.settingsService.setWorkIntervalTime(this.settingsForm.get('workMinutes').value);
    this.settingsService.setRestIntervalTime(this.settingsForm.get('restMinutes').value);
    
  }

}

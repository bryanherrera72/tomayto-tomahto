import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TrackerComponent } from './tracker/tracker.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SettingsComponent } from './settings/settings.component';
import { TimerService } from './services/timer/timer.service';
import { SettingsService } from './services/settings/settings.service';
import { TrackerService } from './services/tracker/tracker.service';
import { IntervalService } from './services/interval/interval.service';
import { AlertService } from './services/alert/alert.service';

import {RouterModule, Routes} from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { InstructionsComponent } from './instructions/instructions.component';
import { TimerDigitsPipe } from './timer-digits.pipe';

const routes: Routes = [
  {path: '' ,component: HomeComponent}, 
  {path: 'about', component: AboutComponent},
  {path: 'instructions', component: InstructionsComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrackerComponent,
    TaskListComponent,
    SettingsComponent,
    AboutComponent,
    HomeComponent,
    InstructionsComponent,
    TimerDigitsPipe
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [SettingsService, IntervalService, TimerService, TrackerService,AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';

/*
  Component keeps track of task list that the user has defined. 
*/
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  private tasks = ['Finish Working on clear data items',
                    'Check (and respond to all) emails',
                    'Finish paper for 424',
                    'Work on project for 482',];

  constructor() { }

  ngOnInit() {
  }

}

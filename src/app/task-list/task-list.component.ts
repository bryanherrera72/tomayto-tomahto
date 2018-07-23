import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { FormArray, FormGroup, FormControl, Validators} from '@angular/forms';

/*
  Component keeps track of task list that the user has defined. 
*/
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  private task_test= [];
  // private task_test = [new Task(false,'Finish Working on clear data items'),
  //                   new Task(false,'Check (and respond to all) emails'),
  //                   new Task(false,'Finish paper for 424'),
  //                   new Task(true, 'Work on project for 482')];
  private tasks:Task[] = [];
  adding: boolean = false;
  taskEntryForm: FormGroup;
  taskForm:FormGroup;
  addTaskForm: FormArray;
  constructor() { }

  ngOnInit() {
    this.taskEntryForm = new FormGroup({
        "addSingleTask": new FormControl('', [Validators.minLength(5), Validators.required]),
      });

    this.taskForm = new FormGroup({
      "taskSet": new FormArray([]),
    });
    for(let i = 0; i < this.task_test.length; i++){
      this.addTask(this.task_test[i]);
    }

    //need to add the logic for tacking on tasks in the task list form 
  }

  onClickAddTask(){
    this.adding = true;
  }

  onAddTask(){
    this.addTask(new Task(false,this.taskEntryForm.get('addSingleTask').value));
    this.taskEntryForm.reset();
    this.adding=false;
  }

  addTask(task:Task){
    this.tasks.push(task);
    const control = new FormControl();
    (<FormArray>this.taskForm.get('taskSet')).push(control);
    console.log(this.taskForm.controls);
  }

  onTaskCheck(i: number){
    if((<FormArray>this.taskForm.get('taskSet')).get(i + '').value === true){
      (<FormArray>this.taskForm.get('taskSet')).get(i + '').setValue(false);
      
    }
    else{
      (<FormArray>this.taskForm.get('taskSet')).get(i + '').setValue(true);

    }
  }

  strikethrough(i:number){
    let strikethrough;
    if((<FormArray>this.taskForm.get('taskSet')).get(i + '').value === true &&
      (<FormArray>this.taskForm.get('taskSet')).get(i + '').value != null){
      strikethrough = {
        'strikethrough' : true,
      }
    }
    else{
      strikethrough = {
        'strikethrough' : false,
      }
    }
    return strikethrough;
  }
  
  cancelAdd(){
    this.adding= false;
  }
  
  onMarkAsComplete(){

  }

  

}

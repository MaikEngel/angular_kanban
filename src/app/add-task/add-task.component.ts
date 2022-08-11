import { Component, OnInit } from '@angular/core';
import { collection, getDoc, updateDoc } from '@angular/fire/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { doc, setDoc } from "firebase/firestore";
import { Task } from 'src/models/task.class';
import { GlobalArrayService } from '../global-array.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  title: any;
  category: any;
  urgency: any;
  description: any;
  date: any;
  todo: any[];
  tasks: any;

  coll: any;
  docRef: any;
  docSnap: any;
  currentId: any;

  public add_task: FormGroup;
  task = new Task();

  constructor(public globalArray: GlobalArrayService) { }

  ngOnInit(): void {

    console.log(this.task);


    this.add_task = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      category: new FormControl('', [Validators.required]),
      urgency: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      date: new FormControl('', [Validators.required]),
    });
  }


  public checkError = (controlName: string, errorName: string) => {
    return this.add_task.controls[controlName].hasError(errorName);
  }

  addTask() {
    this.globalArray.todo.push(this.task.toJSON())
    console.log(this.globalArray.todo);
    
  }
}

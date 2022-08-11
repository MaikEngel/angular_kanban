import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from 'src/models/task.class';
import { GlobalArrayService } from '../global-array.service';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { addDoc, doc, setDoc } from "firebase/firestore";

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

  task$: Observable<any>;


  constructor(public globalArray: GlobalArrayService, public firestore: Firestore) {
  }

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

  async addTask() {
    const coll = collection(this.firestore, 'tasks');
    this.task$ = collectionData(coll);
    const docRef = await addDoc(coll, {
      todo: this.task.toJSON()
    });
    console.log(docRef.id);
    this.globalArray.todo.push(this.task.toJSON());
    console.log(this.globalArray.todo);
  }
}

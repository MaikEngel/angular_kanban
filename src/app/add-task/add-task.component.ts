import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from 'src/models/task.class';
import { GlobalArrayService } from '../global-array.service';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { addDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ActivatedRoute } from '@angular/router';
import { query, where, onSnapshot } from "firebase/firestore";

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

  public add_task: FormGroup;
  task = new Task();

  task$: Observable<any>;


  constructor(public globalArray: GlobalArrayService, public firestore: Firestore, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.globalArray.startScreen = false;
    this.route.params.subscribe(params => {
      this.globalArray.currentId = params['id'];
    });

    console.log(this.globalArray.currentId);

    this.getDoc()

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

  async getDoc() {

    const docRef = doc(this.firestore, "tasks", this.globalArray.currentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.globalArray.TASKS = docSnap.data()['TASKS'];
      console.log(this.globalArray);
      
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  // updateLocal() {
  //   const q = query(collection(this.firestore, "tasks", this.globalArray.currentId));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       this.globalArray.todo.push(doc.data()['todo']);
  //       this.globalArray.inProgress.push(doc.data()['name']);
  //       this.globalArray.testing.push(doc.data()['name']);
  //       this.globalArray.done.push(doc.data()['name']);
  //       console.log('Nareg ist ganz okay');
        
  //     });
  //   });
  // }

  async addTask() {
    this.globalArray.TASKS.todo.push(this.task.toJSON());
    this.globalArray.TASKS.backlog.push(this.task.toJSON());
    const coll = collection(this.firestore, 'tasks',);
    this.task$ = collectionData(coll);
    const userRef = doc(coll, this.globalArray.currentId);
    const docRef = await updateDoc(userRef, {
      TASKS: this.globalArray.TASKS,
    })
    console.log();
    
  }
}

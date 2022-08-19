import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { Task } from 'src/models/task.class';
import { GlobalArrayService } from '../global-array.service';
import { query, where, onSnapshot } from "firebase/firestore";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  
  task = new Task();
  urgency: any;



  constructor(public globalArray: GlobalArrayService, private route: ActivatedRoute, public firestore: Firestore) { }

  ngOnInit(): void {
    this.globalArray.startScreen = false;
    console.log(this.globalArray);

    this.route.params.subscribe(params => {
      this.globalArray.currentId = params['id'];
    });
    this.getDoc()
  }

  async getDoc() {

    const docRef = doc(this.firestore, "tasks", this.globalArray.currentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.globalArray.TASKS = docSnap.data()['TASKS'];
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  // updateLocal() {

  //   const unsub = onSnapshot(doc(this.firestore, "tasks"), (doc) => {
  //     this.globalArray.todo = doc.data()['todo'];
  //     this.globalArray.inProgress.push(doc.data()['inProgress']);
  //     this.globalArray.testing.push(doc.data()['testing']);
  //     this.globalArray.done.push(doc.data()['done']);
  //     console.log(this.globalArray);
  //   });
  // }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
        );
        console.log(event);
        console.log(event.previousIndex, event.currentIndex);
      this.updateArrays();
    }
  }

  async updateArrays() {
    const coll = collection(this.firestore, 'tasks',);
    const userRef = doc(coll, this.globalArray.currentId);
    const docRef = await setDoc(userRef, {
      TASKS: this.globalArray.TASKS,
    });
  }
}

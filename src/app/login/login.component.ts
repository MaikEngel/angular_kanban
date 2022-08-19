import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { GlobalArrayService } from '../global-array.service';
import { Observable } from 'rxjs';
import { Task } from 'src/models/task.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  task$: Observable<any>;

  task = new Task();


  constructor(public router: Router, public firestore: Firestore, public globalArray: GlobalArrayService) { }

  ngOnInit(): void {
    this.globalArray.startScreen = true;
  }

  async goToBoard() {
    const coll = collection(this.firestore, 'tasks');
    this.task$ = collectionData(coll);
    const docRef = await addDoc(coll, {
      TASKS: this.globalArray.TASKS
    });
    this.router.navigateByUrl('/board/' + docRef.id)
  }

}

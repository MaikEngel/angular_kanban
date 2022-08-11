import { Component, OnInit } from '@angular/core';
import { collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(public data: DatabaseService, public router: Router) { }

  ngOnInit(): void {
  }
  
  async getId(){
    this.data.coll = collection(this.data.firestore, 'tasks');
    const docRef = doc(this.data.coll);
    const docSnap = await getDoc(docRef);
    const currentId = docRef.id;
    await setDoc(doc(this.data.coll, currentId), {
      tasks: {
        todo: this.data.todo,
        inProgress: this.data.inProgress,
        testing: this.data.testing,
        done: this.data.done,
      }
    });
    this.router.navigateByUrl('/board/' + currentId)
  }

}

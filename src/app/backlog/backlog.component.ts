import { Component, OnInit } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { GlobalArrayService } from '../global-array.service';


@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  displayedColumns: string[] = ['title', 'category', 'urgency', 'description', 'createdAt'];
  dataSource = this.globalArray.TASKS.backlog;

  constructor(public firestore: Firestore, public globalArray: GlobalArrayService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.globalArray.startScreen = false;
    this.route.params.subscribe(params => {
      this.globalArray.currentId = params['id'];
    });
    
    this.getDoc()
    console.log(this.globalArray);
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

}
